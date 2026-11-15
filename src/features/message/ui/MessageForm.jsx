import { useState } from 'react';
import { Alert, TextInput, Button, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTranslation } from 'react-i18next';  
import filter from 'leo-profanity';
import { useSendMessage } from '../../../entities/message/model/useMessages';

filter.loadDictionary('ru');

export function MessageForm({ channelId }) {
  const { t } = useTranslation();                
  const [sendError, setSendError] = useState(null);
  const { mutate: sendMessage, isPending } = useSendMessage();

  const form = useForm({
    initialValues: { body: '' },
  });

  const handleSubmit = (values) => {
    if (!values.body.trim()) return;

    const cleanBody = filter.clean(values.body);

    sendMessage(
      { body: cleanBody, channelId },
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
        <Alert color="red" title={t('messages.error')}>   
          {sendError}
        </Alert>
      )}
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Group mt="md" align="flex-end">
          <TextInput
            placeholder={t('messages.placeholder')}       
            style={{ flex: 1 }}
            disabled={isPending}
            {...form.getInputProps('body')}
          />
          <Button type="submit" loading={isPending}>
            {t('messages.send')}                          
          </Button>
        </Group>
      </form>
    </>
  );
}