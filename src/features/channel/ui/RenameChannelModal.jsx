import { useForm } from '@mantine/form';
import { Modal, TextInput, Button, Stack, Group } from '@mantine/core';
import { useRenameChannel } from '../../../entities/channel/model/useChannels';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export function RenameChannelModal({ opened, onClose, channel, existingChannels }) {
  const {t} = useTranslation()
  const { mutate: renameChannel, isPending } = useRenameChannel();
  const inputRef = useRef(null);

  const form = useForm({
    initialValues: { name: channel?.name || '' },
    validate: {
       name: (value) => {
        if (!value) return t('validation.required');
        if (value.length < 3) return t('validation.usernameMin');
        if (value.length > 20) return t('validation.usernameMax');
        if (
          value !== channel?.name &&
          existingChannels?.some((c) => c.name === value)
        ) {
          return t('validation.channelNameExists');
        }
        return null;
      },
    },
  });

  useEffect(() => {
    if (opened && channel) {
      form.setFieldValue('name', channel.name);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [opened, channel]);

  const handleSubmit = (values) => {
    renameChannel(
      { id: channel.id, name: values.name },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

   return (
    <Modal opened={opened} onClose={onClose} title={t('channels.rename')}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            ref={inputRef}
            label={t('channels.newChannelName')}
            placeholder={t('channels.channelPlaceholder')}
            disabled={isPending}
            {...form.getInputProps('name')}
          />
          <Group justify="flex-end">
            <Button variant="default" onClick={onClose} disabled={isPending}>
              {t('channels.cancel')}
            </Button>
            <Button type="submit" loading={isPending}>
              {t('channels.rename')}
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}