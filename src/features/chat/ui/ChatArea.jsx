import { Paper, Title, Text } from '@mantine/core';
import useChatStore from '../../../app/store/chatStore';
import { MessageList } from '../../../entities/message/ui/MessageList';
import { MessageForm } from '../../message/ui/MessageForm';

// 👇 Принимаем пропсы, а не используем хук
export function ChatArea({ channels, messages, onSendMessage, isSending }) {
  const currentChannelId = useChatStore((state) => state.currentChannelId);
  const currentChannel = channels?.find((c) => c.id === currentChannelId);
  const channelMessages = messages?.filter((m) => m.channelId === currentChannelId);

  const handleSendMessage = (body) => {
    if (!currentChannelId) return;
    // 👇 Вызываем функцию, переданную из ChatPage
    onSendMessage({ body, channelId: currentChannelId });
  };

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
      {/* 👇 Используем проп isSending */}
      <MessageForm onSubmit={handleSendMessage} loading={isSending} />
    </Paper>
  );
}