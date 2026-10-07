import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Button, Stack, Alert } from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../../shared/auth';
import useAuthStore from '../../../app/store/authStore';

function SignUpForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const authLogin = useAuthStore((state) => state.login);

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      username: (value) => {
        if (!value) return 'Имя пользователя обязательно';
        if (value.length < 3) return 'Минимум 3 символа';
        if (value.length > 20) return 'Максимум 20 символов';
        return null;
      },
      password: (value) => {
        if (!value) return 'Пароль обязателен';
        if (value.length < 6) return 'Минимум 6 символов';
        return null;
      },
      confirmPassword: (value, values) => {
        if (!value) return 'Подтверждение пароля обязательно';
        if (value !== values.password) return 'Пароли не совпадают';
        return null;
      },
    },
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    setError(null);

    try {
      const data = await signup(values.username, values.password);
      authLogin(data.token, data.username);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Ошибка регистрации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        {error && (
          <Alert color="red" title="Ошибка регистрации">
            {error}
          </Alert>
        )}

        <TextInput
          label="Имя пользователя"
          placeholder="Введите имя"
          disabled={loading}
          {...form.getInputProps('username')}
        />

        <PasswordInput
          label="Пароль"
          placeholder="Введите пароль"
          disabled={loading}
          {...form.getInputProps('password')}
        />

        <PasswordInput
          label="Подтверждение пароля"
          placeholder="Повторите пароль"
          disabled={loading}
          {...form.getInputProps('confirmPassword')}
        />

        <Button type="submit" fullWidth mt="md" loading={loading}>
          Зарегистрироваться
        </Button>
      </Stack>
    </form>
  );
}

export default SignUpForm