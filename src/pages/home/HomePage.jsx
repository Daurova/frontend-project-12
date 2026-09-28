import { Badge, Flex, Loader } from '@mantine/core';
import { useChannels } from '../../entities/channel/model/useChannels';
import { useMessages } from '../../entities/message/model/useMessages';
import { Sidebar } from '../../features/chat/ui/Sidebar';
import { ChatArea } from '../../features/chat/ui/ChatArea';
import { useSocketEvent } from '../../shared/lib/useSocketEvent';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import useChatStore from '../../app/store/chatStore';

export function HomePage({ socket }) {
  const [isConnected, setIsConnected] = useState(socket?.connected ?? false);
  const queryClient = useQueryClient();

  const currentChannelId = useChatStore((state) => state.currentChannelId);
  const setCurrentChannelId = useChatStore((state) => state.setCurrentChannelId);

  const { data: channels, isLoading: channelsLoading } = useChannels();
  const { data: messages, isLoading: messagesLoading } = useMessages();

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
    if (channels?.length && !currentChannelId) {
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
          Попытка переподключения...
        </Badge>
      )}
      </Flex>
    </Flex>
  );
}

export default HomePage;