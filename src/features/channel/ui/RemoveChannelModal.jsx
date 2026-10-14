import { Modal, Button, Text, Group } from '@mantine/core';
import { useRemoveChannel } from '../../../entities/channel/model/useChannels';
import { useQueryClient } from '@tanstack/react-query';
import useChatStore from '../../../app/store/chatStore'; 
import { useTranslation } from 'react-i18next'; 

export function RemoveChannelModal({ opened, onClose, channel }) {
  const {t}= useTranslation()
  const { mutate: removeChannel, isPending } = useRemoveChannel();
  const queryClient = useQueryClient();
  const setCurrentChannelId = useChatStore((state) => state.setCurrentChannelId); 

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
    <Modal opened={opened} onClose={onClose} title={t('channels.remove')}>
      <Text mb="lg">
        {t('channels.removeConfirm')} <strong>#{channel?.name}</strong>?
      </Text>
      <Group justify="flex-end">
        <Button variant="default" onClick={onClose} disabled={isPending}>
          {t('channels.cancel')}
        </Button>
        <Button color="red" onClick={handleRemove} loading={isPending}>
          {t('channels.remove')}
        </Button>
      </Group>
    </Modal>
  );
}