import { useForm } from '@mantine/form';
import { Modal, TextInput, Button, Stack, Group } from '@mantine/core';
import { useCreateChannel } from '../../../entities/channel/model/useChannels';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export function AddChannelModal({ opened, onClose, existingChannels }) {
  const {t} = useTranslation()
  const { mutate: createChannel, isPending } = useCreateChannel();
  const inputRef = useRef(null);

  const form = useForm({
    initialValues: { name: '' },
    validate: {
      name: (value) => {
        if (!value) return t('validation.required');
        if (value.length < 3) return t('validation.usernameMin');
        if (value.length > 20) return t('validation.usernameMax');
        if (existingChannels?.some((c) => c.name === value)) {
          return t('validation.channelNameExists');
        }
        return null;
      },
    },
  });

  // Фокус на поле при открытии
  useEffect(() => {
    if (opened) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [opened]);

  const handleSubmit = (values) => {
    createChannel(values.name, {
      onSuccess: () => {
        form.reset();
        onClose();
      },
    });
  };

  return (
    <Modal opened={opened} onClose={onClose} title={t('channels.add')}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            ref={inputRef}
            label={t('channels.channelName')}
            placeholder={t('channels.channelPlaceholder')}
            disabled={isPending}
            {...form.getInputProps('name')}
          />
          <Group justify="flex-end">
            <Button variant="default" onClick={onClose} disabled={isPending}>
              {t('channels.cancel')}
            </Button>
            <Button type="submit" loading={isPending}>
              {t('channels.create')}
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}