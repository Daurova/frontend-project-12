import { Flex, Loader } from '@mantine/core';
import { useChannels } from '../../entities/channel/model/useChannels';
import { useMessages } from '../../entities/message/model/useMessages';
import { Sidebar } from '../../features/chat/ui/Sidebar';
import { ChatArea } from '../../features/chat/ui/ChatArea';

export function HomePage() {
  const { data: channels, isLoading: channelsLoading } = useChannels();
  const { data: messages, isLoading: messagesLoading } = useMessages();

  if (channelsLoading || messagesLoading) return <Loader />;

  return (
    <Flex h="100vh">
      <Sidebar channels={channels} />
      <ChatArea channels={channels} messages={messages} />
    </Flex>
  );
}

export default HomePage