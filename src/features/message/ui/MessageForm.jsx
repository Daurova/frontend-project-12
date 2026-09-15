import { useForm } from '@mantine/form';
import { TextInput, Button, Group } from '@mantine/core';

export function MessageForm({ onSubmit }) {
  const form = useForm({
    initialValues: {
      body: '',
    },
  });

  const handleSubmit = (values) => {
    if (!values.body.trim()) return;
    
    onSubmit(values.body);
    form.reset();
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Group mt="md" align="flex-end">
        <TextInput
          placeholder="Введите сообщение..."
          style={{ flex: 1 }}
          {...form.getInputProps('body')}
        />
        <Button type="submit">Отправить</Button>
      </Group>
    </form>
  );
}