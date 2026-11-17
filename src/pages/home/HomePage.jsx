import { Badge, Flex, Loader } from '@mantine/core';
import { useChannels } from '../../entities/channel/model/useChannels';
import { useMessages } from '../../entities/message/model/useMessages';
import { Sidebar } from '../../features/chat/ui/Sidebar';
import { ChatArea } from '../../features/chat/ui/ChatArea';
import { useSocketEvent } from '../../shared/lib/useSocketEvent';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react'; // <-- убрали useRef
import useChatStore from '../../app/store/chatStore';
import { useTranslation } from 'react-i18next';
import { notifications } from '@mantine/notifications';

export function HomePage({ socket }) {
  const {t} = useTranslation()
  const [isConnected, setIsConnected] = useState(socket?.connected ?? false);
  const queryClient = useQueryClient();

  const currentChannelId = useChatStore((state) => state.currentChannelId);
  const setCurrentChannelId = useChatStore((state) => state.setCurrentChannelId);

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
    // Если есть каналы и нет текущего канала
    if (channels?.length && !currentChannelId) {
      const generalChannel = channels.find((c) => c.name === 'general');
      const idToSet = generalChannel ? generalChannel.id : channels[0].id;
      
      // Устанавливаем только если это реально другое значение
      if (idToSet !== currentChannelId) {
         setCurrentChannelId(idToSet);
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