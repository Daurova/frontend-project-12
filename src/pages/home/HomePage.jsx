import { Flex, Loader } from '@mantine/core';
import { useChannels } from '../../entities/channel/model/useChannels';
import { useMessages, useSendMessage } from '../../entities/message/model/useMessages';
import { Sidebar } from '../../features/chat/ui/Sidebar';
import { ChatArea } from '../../features/chat/ui/ChatArea';

export function HomePage() {
  const { data: channels, isLoading: channelsLoading } = useChannels();
  const { data: messages, isLoading: messagesLoading } = useMessages();
  const { mutate: sendMessage, isPending: isSending } = useSendMessage();

  if (channelsLoading || messagesLoading) return <Loader />;

  return (
    <Flex h="100vh">
      <Sidebar channels={channels} />
      <ChatArea channels={channels} messages={messages}  onSendMessage={sendMessage} isSending={isSending}/>
    </Flex>
  );
}

export default HomePage