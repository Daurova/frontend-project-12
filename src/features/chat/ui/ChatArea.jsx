import { Paper, Text } from '@mantine/core';
import { MessageList } from '../../../entities/message/ui/MessageList';
import { MessageForm } from '../../message/ui/MessageForm';
import { useTranslation } from 'react-i18next';

export function ChatArea({ channels, messages, activeChannelId }) { // <-- добавили пропс
  const { t } = useTranslation(); 
  const currentChannel = channels?.find((c) => c.id === activeChannelId);
  const channelMessages = messages?.filter((m) => m.channelId === activeChannelId);

  if (!currentChannel) {
    return (
      <Paper withBorder p="md" style={{ flex: 1 }}>
        <Text c="dimmed">{t('messages.selectChannel')}</Text>
      </Paper>
    );
  }

  return (
    <Paper withBorder p="md" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>
        {`# ${currentChannel.name}`}
      </h3>
      <MessageList messages={channelMessages} />
      <MessageForm channelId={activeChannelId} />
    </Paper>
  );
}