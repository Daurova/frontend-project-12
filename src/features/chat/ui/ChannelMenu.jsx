import { Menu, ActionIcon } from '@mantine/core';
import { IconDots, IconPencil, IconTrash } from '@tabler/icons-react';
import useChatStore from '../../../app/store/chatStore';

export function ChannelMenu({ channel }) {
  const openRenameModal = useChatStore((state) => state.openRenameModal);
  const openRemoveModal = useChatStore((state) => state.openRemoveModal);

  return (
    <Menu shadow="md" width={200} position="bottom-end">
      <Menu.Target>
        <ActionIcon
          variant="subtle"
          onClick={(e) => e.stopPropagation()} // ← чтобы не переключался канал
        >
          <IconDots size={16} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          leftSection={<IconPencil size={14} />}
          onClick={() => openRenameModal(channel)}
        >
          Переименовать
        </Menu.Item>
        <Menu.Item
          leftSection={<IconTrash size={14} />}
          color="red"
          onClick={() => openRemoveModal(channel)}
        >
          Удалить
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}