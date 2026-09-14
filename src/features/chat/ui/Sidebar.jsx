import { Paper, Text } from '@mantine/core';
import { ChannelList } from '../../../entities/channel/ui/ChannelList';

export function Sidebar({ channels }) {
  return (
    <Paper withBorder p="sm" style={{ width: 200, height: '100%' }}>
      <Text fw={700} mb="sm">Каналы</Text>
      <ChannelList channels={channels} />
    </Paper>
  );
}