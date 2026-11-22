import { Badge, Flex, Loader } from '@mantine/core';
import { useChannels } from '../../entities/channel/model/useChannels';
import { useMessages } from '../../entities/message/model/useMessages';
import { Sidebar } from '../../features/chat/ui/Sidebar';
import { ChatArea } from '../../features/chat/ui/ChatArea';
import { useSocketEvent } from '../../shared/lib/useSocketEvent';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useChatStore } from '../../app/store/useChatStore';
import { useTranslation } from 'react-i18next';
import { notifications } from '@mantine/notifications';

export function HomePage({ socket }) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  // 1. Сначала объявляем useState
  const [isConnected, setIsConnected] = useState(socket?.connected ?? false);

  // 2. Теперь используем setIsConnected в сокетах (ошибка порядка исчезнет)
  useSocketEvent(socket, 'connect', () => setIsConnected(true));
  useSocketEvent(socket, 'disconnect', () => setIsConnected(false));

  // Читаем из стора только то, что нужно для рендера
  const currentChannelId = useChatStore((state) => state.currentChannelId);
  
  // Удаляем setCurrentChannelId, так как HomePage его не использует
  
  const { data: channels, isLoading: channelsLoading, error: channelsError } = useChannels();
  const { data: messages, isLoading: messagesLoading, error: messagesError } = useMessages();

  // Обновление кэша по сокетам
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

  // Уведомления об ошибках
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

  // Логика выбора канала (берем из стора)
// Если в сторе пусто, берем ID канала general из загруженных каналов
const activeChannelId = currentChannelId || 
  (channels?.length 
    ? (channels.find((c) => c.name === 'general') || channels[0]).id 
    : null);
    
  if (channelsLoading || messagesLoading) return <Loader />;

  return (
    <Flex h="100vh" direction="column">
      <Flex style={{ flex: 1 }}>
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