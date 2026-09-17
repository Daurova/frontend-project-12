import { Flex, Loader } from '@mantine/core';
import { useChannels } from '../../entities/channel/model/useChannels';
import { useMessages, useSendMessage } from '../../entities/message/model/useMessages';
import { Sidebar } from '../../features/chat/ui/Sidebar';
import { ChatArea } from '../../features/chat/ui/ChatArea';
import { useSocketEvent } from '../../shared/lib/useSocketEvent';
import { useQueryClient } from '@tanstack/react-query';

export function HomePage({socket}) {
  const queryClient = useQueryClient();

  const { data: channels, isLoading: channelsLoading } = useChannels();
  const { data: messages, isLoading: messagesLoading } = useMessages();
  const { mutate: sendMessage, isPending: isSending } = useSendMessage();

  
  // Подписка на новые сообщения
  useSocketEvent(socket, 'newMessage', () => {
    queryClient.invalidateQueries({ queryKey: ['messages'] });
  });

  // Подписка на новые каналы
  useSocketEvent(socket, 'newChannel', () => {
    queryClient.invalidateQueries({ queryKey: ['channels'] });
  });

  // Подписка на удаление канала
  useSocketEvent(socket, 'removeChannel', () => {
    queryClient.invalidateQueries({ queryKey: ['channels'] });
  });

  // Подписка на переименование канала
  useSocketEvent(socket, 'renameChannel', () => {
    queryClient.invalidateQueries({ queryKey: ['channels'] });
  });
  if (channelsLoading || messagesLoading) return <Loader />;

  return (
    <Flex h="100vh">
      <Sidebar channels={channels} />
      <ChatArea channels={channels} messages={messages}  onSendMessage={sendMessage} isSending={isSending}/>
    </Flex>
  );
}

export default HomePage