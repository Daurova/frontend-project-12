import { Paper, Title, Text } from '@mantine/core';
import useChatStore from '../../../app/store/chatStore';
import { MessageList } from '../../../entities/message/model/ui/MessageList';
import { MessageForm } from '../../message/ui/messageForm';

export function ChatArea({ channels, messages }) {
  const currentChannelId = useChatStore((state) => state.currentChannelId);
  const currentChannel = channels?.find((c) => c.id === currentChannelId);
  const channelMessages = messages?.filter((m) => m.channelId === currentChannelId);
  
  const handleSendMessage = (body) => {
    // Пока просто логируем — отправку добавим позже
    console.log('Новое сообщение:', body);
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
      <MessageForm onSubmit={handleSendMessage} />

    </Paper>
  );
}