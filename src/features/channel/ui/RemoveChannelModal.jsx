import { Modal, Button, Text, Group } from '@mantine/core';
import { useRemoveChannel } from '../../../entities/channel/model/useChannels';
import { useQueryClient } from '@tanstack/react-query';
import useChatStore from '../../../app/store/chatStore'; // ← добавь

export function RemoveChannelModal({ opened, onClose, channel }) {
  const { mutate: removeChannel, isPending } = useRemoveChannel();
  const queryClient = useQueryClient();
  const setCurrentChannelId = useChatStore((state) => state.setCurrentChannelId); // ← добавь

  const handleRemove = () => {
    removeChannel(channel.id, {
      onSuccess: () => {
        const channels = queryClient.getQueryData(['channels']);
        const generalChannel = channels?.find((c) => c.name === 'general');
        
        if (generalChannel) {
          setCurrentChannelId(generalChannel.id);
        }
        
        onClose();
      },
    });
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Удалить канал">
      <Text mb="lg">
        Вы уверены, что хотите удалить канал <strong>#{channel?.name}</strong>?
        Все сообщения будут удалены.
      </Text>
      <Group justify="flex-end">
        <Button variant="default" onClick={onClose} disabled={isPending}>
          Отмена
        </Button>
        <Button color="red" onClick={handleRemove} loading={isPending}>
          Удалить
        </Button>
      </Group>
    </Modal>
  );
}