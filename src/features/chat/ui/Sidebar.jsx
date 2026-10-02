import { Paper, Text, Button, Stack, ScrollArea } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { AddChannelModal } from '../../channel/ui/AddChannelModal';
import { RenameChannelModal } from '../../channel/ui/RenameChannelModal';
import { RemoveChannelModal } from '../../channel/ui/RemoveChannelModal';
import useChatStore from '../../../app/store/chatStore';
import { ChannelList } from './ChannelList';

export function Sidebar({ channels }) {
    console.log('Sidebar рендерится, channels:', channels); // ← добавь

  const isAddModalOpen = useChatStore((state) => state.isAddModalOpen);
  const openAddModal = useChatStore((state) => state.openAddModal);
  const closeAddModal = useChatStore((state) => state.closeAddModal);

  const isRenameModalOpen = useChatStore((state) => state.isRenameModalOpen);
  const closeRenameModal = useChatStore((state) => state.closeRenameModal);
  const channelToRename = useChatStore((state) => state.channelToRename);

  const isRemoveModalOpen = useChatStore((state) => state.isRemoveModalOpen);
  const closeRemoveModal = useChatStore((state) => state.closeRemoveModal);
  const channelToRemove = useChatStore((state) => state.channelToRemove);

  return (
    <Paper withBorder p="sm" style={{ width: 250, height: '100%' }}>
      <Stack gap="xs" h="100%">
        <Text fw={700}>Каналы</Text>
        <Button
          leftSection={<IconPlus size={16} />}
          variant="light"
          fullWidth
          onClick={openAddModal}
        >
          Добавить
        </Button>
          <ChannelList channels={channels} />
      </Stack>

      <AddChannelModal
        opened={isAddModalOpen}
        onClose={closeAddModal}
        existingChannels={channels}
      />
      <RenameChannelModal
        opened={isRenameModalOpen}
        onClose={closeRenameModal}
        channel={channelToRename}
        existingChannels={channels}
      />
      <RemoveChannelModal
        opened={isRemoveModalOpen}
        onClose={closeRemoveModal}
        channel={channelToRemove}
      />
    </Paper>
  );
}