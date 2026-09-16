import { useForm } from '@mantine/form';
import { TextInput, Button, Group } from '@mantine/core';

export function MessageForm({ onSubmit, loading }) {  // ← добавь loading
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
          disabled={loading}  // ← раскомментируй
          {...form.getInputProps('body')}
        />
        <Button type="submit" loading={loading}>  {/* ← добавь loading */}
          Отправить
        </Button>
      </Group>
    </form>
  );
}