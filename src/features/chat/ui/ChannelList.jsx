import { Button, Stack, ScrollArea, Group } from '@mantine/core';
import useChatStore from '../../../app/store/chatStore';
import { ChannelMenu } from './ChannelMenu';

export function ChannelList({ channels, activeChannelId }) {
  const setCurrentChannelId = useChatStore((state) => state.setCurrentChannelId);

  return (
    <ScrollArea h="100%">
      <Stack gap="xs">
        {channels?.map((channel) => (
          <Group key={channel.id} wrap="nowrap" gap={0}>
            <Button
              variant={channel.id === activeChannelId ? 'light' : 'subtle'}
              justify="flex-start"
              style={{ flex: 1 }}
              onClick={() => setCurrentChannelId(channel.id)}
            >
              # {channel.name}
            </Button>
            
            {(channel.name !== 'general' && channel.name !== 'random') && (
              <ChannelMenu channel={channel} />
            )}
          </Group>
        ))}
      </Stack>
    </ScrollArea>
  );
}