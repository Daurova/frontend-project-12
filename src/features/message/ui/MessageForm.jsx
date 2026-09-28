import { useState } from 'react';
import { Alert, TextInput, Button, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useSendMessage } from '../../../entities/message/model/useMessages';

export function MessageForm({ channelId }) {
  const [sendError, setSendError] = useState(null);
  const { mutate: sendMessage, isPending } = useSendMessage();

  const form = useForm({
    initialValues: { body: '' },
  });

  const handleSubmit = (values) => {
    if (!values.body.trim()) return;

    sendMessage(
      { body: values.body, channelId },
      {
        onError: (error) => setSendError(error.message),
        onSuccess: () => setSendError(null),
      }
    );

    form.reset();
  };

  return (
    <>
      {sendError && (
        <Alert color="red" title="Ошибка отправки">
          {sendError}
        </Alert>
      )}
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Group mt="md" align="flex-end">
          <TextInput
            placeholder="Введите сообщение..."
            style={{ flex: 1 }}
            disabled={isPending}
            {...form.getInputProps('body')}
          />
          <Button type="submit" loading={isPending}>
            Отправить
          </Button>
        </Group>
      </form>
    </>
  );
}