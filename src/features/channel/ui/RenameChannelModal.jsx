import { useForm } from '@mantine/form';
import { Modal, TextInput, Button, Stack, Group } from '@mantine/core';
import { useRenameChannel } from '../../../entities/channel/model/useChannels';
import { useEffect, useRef } from 'react';

export function RenameChannelModal({ opened, onClose, channel, existingChannels }) {
  const { mutate: renameChannel, isPending } = useRenameChannel();
  const inputRef = useRef(null);

  const form = useForm({
    initialValues: { name: channel?.name || '' },
    validate: {
      name: (value) => {
        if (!value) return 'Имя канала обязательно';
        if (value.length < 3) return 'Минимум 3 символа';
        if (value.length > 20) return 'Максимум 20 символов';
        if (
          value !== channel?.name &&
          existingChannels?.some((c) => c.name === value)
        ) {
          return 'Канал с таким именем уже существует';
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
    <Modal opened={opened} onClose={onClose} title="Переименовать канал">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            ref={inputRef}
            label="Новое имя"
            placeholder="Введите имя"
            disabled={isPending}
            {...form.getInputProps('name')}
          />
          <Group justify="flex-end">
            <Button variant="default" onClick={onClose} disabled={isPending}>
              Отмена
            </Button>
            <Button type="submit" loading={isPending}>
              Переименовать
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}