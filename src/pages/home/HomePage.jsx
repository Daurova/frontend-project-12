import { Badge, Flex, Loader } from '@mantine/core';
import { useChannels } from '../../entities/channel/model/useChannels';
import { useMessages } from '../../entities/message/model/useMessages';
import { Sidebar } from '../../features/chat/ui/Sidebar';
import { ChatArea } from '../../features/chat/ui/ChatArea';
import { useSocketEvent } from '../../shared/lib/useSocketEvent';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState, useMemo } from 'react'; 
import useChatStore from '../../app/store/chatStore';
import { useTranslation } from 'react-i18next';
import { notifications } from '@mantine/notifications';

export function HomePage({ socket }) {
  const { t } = useTranslation();
  const [isConnected, setIsConnected] = useState(socket?.connected ?? false);
  const queryClient = useQueryClient();

  // Берем ID из стора (он нужен для кликов в Sidebar)
  const storeChannelId = useChatStore((state) => state.currentChannelId);

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

  // ВЫЧИСЛЯЕМ АКТИВНЫЙ КАНАЛ БЕЗ useEffect
  const activeChannelId = useMemo(() => {
    // Если в сторе уже есть ID (пользователь кликнул), используем его
    if (storeChannelId) return storeChannelId;
    
    // Если каналы еще грузятся, ничего не выбираем
    if (!channels?.length) return null;

    // Ищем general, если нет — берем первый
    const general = channels.find((c) => c.name === 'general');
    return general ? general.id : channels[0].id;
  }, [storeChannelId, channels]);

  if (channelsLoading || messagesLoading) return <Loader />;

  return (
    <Flex h="100vh" direction="column">
      <Flex style={{ flex: 1 }}>
        {/* Передаем activeChannelId в Sidebar и ChatArea */}
        <Sidebar channels={channels} activeChannelId={activeChannelId} />
        <ChatArea channels={channels} messages={messages} activeChannelId={activeChannelId} />
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