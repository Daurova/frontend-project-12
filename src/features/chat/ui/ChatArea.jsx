import { Paper, Title, Text } from '@mantine/core';
import useChatStore from '../../../app/store/chatStore';
import { MessageList } from '../../../entities/message/model/ui/MessageList';

export function ChatArea({ channels, messages }) {
  const currentChannelId = useChatStore((state) => state.currentChannelId);
  const currentChannel = channels?.find((c) => c.id === currentChannelId);
  const channelMessages = messages?.filter((m) => m.channelId === currentChannelId);

  if (!currentChannel) {
    return (
      <Paper withBorder p="md" style={{ flex: 1 }}>
        <Text c="dimmed">Выберите канал</Text>
      </Paper>
    );
  }

  return (
    <Paper withBorder p="md" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Title order={3} mb="md">#{currentChannel.name}</Title>
      <MessageList messages={channelMessages} />
    </Paper>
  );
}