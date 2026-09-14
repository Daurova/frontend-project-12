import { Stack, Text } from '@mantine/core';

export function MessageList({ messages }) {
  return (
    <Stack gap="xs" style={{ flex: 1, overflow: 'auto' }}>
      {messages?.map((msg) => (
        <div key={msg.id}>
          <Text fw={500}>{msg.username}</Text>
          <Text>{msg.body}</Text>
        </div>
      ))}
    </Stack>
  );
}