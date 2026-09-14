import { NavLink, Stack, ScrollArea } from '@mantine/core';
import useChatStore from '../../../app/store/chatStore';

export function ChannelList({ channels }) {
  const currentChannelId = useChatStore((state) => state.currentChannelId);
  const setCurrentChannelId = useChatStore((state) => state.setCurrentChannelId);

  return (
    <ScrollArea h="100%">
      <Stack gap="xs">
        {channels?.map((channel) => (
          <NavLink
            key={channel.id}
            label={channel.name}
            active={channel.id === currentChannelId}
            onClick={() => setCurrentChannelId(channel.id)}
          />
        ))}
      </Stack>
    </ScrollArea>
  );
}