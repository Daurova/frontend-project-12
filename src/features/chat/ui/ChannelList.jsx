import { NavLink, Stack, ScrollArea } from '@mantine/core';
import useChatStore from '../../../app/store/chatStore';
import { ChannelMenu } from './ChannelMenu';

export function ChannelList({ channels, activeChannelId }) { // <-- добавили пропс
  const setCurrentChannelId = useChatStore((state) => state.setCurrentChannelId);

  return (
    <ScrollArea h="100%">
      <Stack gap="xs">
        {channels?.map((channel) => (
          <NavLink
            key={channel.id}
            label={
              <div >
                 <span>{channel.name}</span> 
                 {(channel.name !== 'general' && channel.name !== 'random') && ( <ChannelMenu channel={channel} /> )} 
                 </div>

            }
            active={channel.id === activeChannelId} // <-- используем пропс
            onClick={() => setCurrentChannelId(channel.id)} // <-- обновляем стор
          />
        ))}
      </Stack>
    </ScrollArea>
  );
}