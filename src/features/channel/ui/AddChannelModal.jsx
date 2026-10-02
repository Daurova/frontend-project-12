import { useForm } from '@mantine/form';
import { Modal, TextInput, Button, Stack, Group } from '@mantine/core';
import { useCreateChannel } from '../../../entities/channel/model/useChannels';
import { useEffect, useRef } from 'react';

export function AddChannelModal({ opened, onClose, existingChannels }) {
  const { mutate: createChannel, isPending } = useCreateChannel();
  const inputRef = useRef(null);

  const form = useForm({
    initialValues: { name: '' },
    validate: {
      name: (value) => {
        if (!value) return 'Имя канала обязательно';
        if (value.length < 3) return 'Минимум 3 символа';
        if (value.length > 20) return 'Максимум 20 символов';
        if (existingChannels?.some((c) => c.name === value)) {
          return 'Канал с таким именем уже существует';
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
    <Modal opened={opened} onClose={onClose} title="Добавить канал">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            ref={inputRef}
            label="Имя канала"
            placeholder="Введите имя"
            disabled={isPending}
            {...form.getInputProps('name')}
          />
          <Group justify="flex-end">
            <Button variant="default" onClick={onClose} disabled={isPending}>
              Отмена
            </Button>
            <Button type="submit" loading={isPending}>
              Создать
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}