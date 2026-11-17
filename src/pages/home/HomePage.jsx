import { Badge, Flex, Loader } from '@mantine/core';
import { useChannels } from '../../entities/channel/model/useChannels';
import { useMessages } from '../../entities/message/model/useMessages';
import { Sidebar } from '../../features/chat/ui/Sidebar';
import { ChatArea } from '../../features/chat/ui/ChatArea';
import { useSocketEvent } from '../../shared/lib/useSocketEvent';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState, useRef } from 'react'; // <-- добавили useRef
import useChatStore from '../../app/store/chatStore';
import { useTranslation } from 'react-i18next';
import { notifications } from '@mantine/notifications';

export function HomePage({ socket }) {
  const {t} = useTranslation()
  const [isConnected, setIsConnected] = useState(socket?.connected ?? false);
  const queryClient = useQueryClient();

  const currentChannelId = useChatStore((state) => state.currentChannelId);
  const setCurrentChannelId = useChatStore((state) => state.setCurrentChannelId);

  // Флаг, чтобы выбрать канал только один раз при старте
  const hasSetInitialChannel = useRef(false);

  const { data: channels, isLoading: channelsLoading, error: channelsError } = useChannels();
  const { data: messages, isLoading: messagesLoading, error: messagesError } = useMessages();

  useSocketEvent(socket, 'newMessage', () => {
    queryClient.invalidateQueries({ queryKey: ['messages'] }).catch(console.error);
  });

  useSocketEvent(socket, 'newChannel', () => {
    queryClient.invalidateQueries({ queryKey: ['channels'] }).catch(console.error);
  });

  useSocketEvent(socket, 'removeChannel', () => {
    queryClient.invalidateQueries({ queryKey: ['channels'] }).catch(console.error);
  });

  useSocketEvent(socket, 'renameChannel', () => {
    queryClient.invalidateQueries({ queryKey: ['channels'] }).catch(console.error);
  });

  useSocketEvent(socket, 'connect', () => setIsConnected(true));
  useSocketEvent(socket, 'disconnect', () => setIsConnected(false));

  useEffect(() => {
    if (channelsError || messagesError) {
      notifications.show({
        title: t('notifications.dataLoadError'),
        message: (channelsError || messagesError)?.message || '',
        color: 'red',
      });
    }
  }, [channelsError, messagesError, t]);

  // Уведомление об отсутствии сети
  useEffect(() => {
    const handleOffline = () => {
      notifications.show({
        title: t('notifications.noConnection'),
        message: '',
        color: 'red',
      });
    };

    window.addEventListener('offline', handleOffline);
    return () => window.removeEventListener('offline', handleOffline);
  }, [t]);

  useEffect(() => {
    // Добавили проверку hasSetInitialChannel.current, чтобы не было цикла
    if (channels?.length && !currentChannelId && !hasSetInitialChannel.current) {
      hasSetInitialChannel.current = true; // Ставим флаг, что выбор сделан
      
      const generalChannel = channels.find((c) => c.name === 'general');
      if (generalChannel) {
        setCurrentChannelId(generalChannel.id);
      } else {
        // Если general нет — берём первый канал
        setCurrentChannelId(channels[0].id);
      }
    }
  }, [channels, currentChannelId, setCurrentChannelId]);

  if (channelsLoading || messagesLoading) return <Loader />;

  return (
    <Flex h="100vh" direction="column">
      <Flex style={{ flex: 1 }}>
        <Sidebar channels={channels} />
        <ChatArea channels={channels} messages={messages} />
         {!isConnected && (
        <Badge color="red" variant="filled">
          {t('connection.reconnecting')}
        </Badge>
      )}
      </Flex>
    </Flex>
  );
}

export default HomePage;