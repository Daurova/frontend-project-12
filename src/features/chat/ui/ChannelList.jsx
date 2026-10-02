import { NavLink, Stack } from '@mantine/core';
import useChatStore from '../../../app/store/chatStore';
import { ChannelMenu } from './ChannelMenu';

export function ChannelList({ channels }) {
      console.log('channels:', channels); // ← добавь

  const currentChannelId = useChatStore((state) => state.currentChannelId);
  const setCurrentChannelId = useChatStore((state) => state.setCurrentChannelId);

  return (
    <Stack gap="xs">
      {channels?.map((channel) => {
        console.log('channel:', channel.name, 'removable:', channel.removable); // ← добавь
        return (
          <NavLink
            key={channel.id}
            label={`# ${channel.name}`}
            active={channel.id === currentChannelId}
            onClick={() => setCurrentChannelId(channel.id)}
            rightSection={
              channel.removable && <ChannelMenu channel={channel} />
            }
          />
        );
      })}
        
    </Stack>
  );
}