import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Button, Paper, Title, Stack } from '@mantine/core';

import { login } from '../../../shared/auth.js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../../app/store/authStore.js';

function LoginForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const authLogin = useAuthStore((state) => state.login); // ← функция из store


  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
  });

const handleSubmit = async (values) => {
  setLoading(true);

  try {
    const data = await login(values.username, values.password);
    authLogin(data.token, data.username);
    navigate('/');
  } catch (err) {
    form.setFieldError('password', err.message || 'Ошибка авторизации');
  } finally {
    setLoading(false);
  }
};

  return (
    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      <Title order={2} ta="center" mb="lg">
        Вход в чат
      </Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            label="Имя пользователя"
            placeholder="Введите имя"
            {...form.getInputProps('username')}
          />
          <PasswordInput
            label="Пароль"
            placeholder="Введите пароль"
            {...form.getInputProps('password')}
          />
          <Button type="submit" fullWidth mt="md" loading={loading}
              loaderProps={{ type: 'dots' }}>
            Войти
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}

export default LoginForm