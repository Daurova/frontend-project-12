import { NavLink, Stack, ScrollArea } from '@mantine/core';
import { useSearchParams } from 'react-router-dom';

export function ChannelList({ channels }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Получаем текущий канал из URL
  const currentChannelId = searchParams.get('channel') ?? null;

  // Обновляем URL при выборе канала
  const setCurrentChannelId = (id) => {
    const params = new URLSearchParams(searchParams);
    if (id) {
      params.set('channel', id);
    } else {
      params.delete('channel');
    }
    setSearchParams(params, { replace: true });
  };

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