import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Button, Paper, Title, Stack } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { login } from '../../../shared/auth.js';
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../app/store/useAuthStore.js';

function LoginForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const authLogin = useAuthStore((state) => state.login);

  // 1. Мемоизируем объект валидации, чтобы избежать цикла рендера
  const formValidate = useMemo(
    () => ({
      username: (value) => {
        if (!value) return 'This field is required';
        if (value.length < 3) return 'Username must be at least 3 characters';
        return null;
      },
      password: (value) => {
        if (!value) return 'This field is required';
        // if (value.length < 6) return 'Password must be at least 6 characters';
        return null;
      },
    }),
    [] // Зависимости нет, так как строки статичны
  );

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
    validate: formValidate, // Передаем мемоизированный объект
  });

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      const data = await login(values.username, values.password);
      authLogin(data.token, data.username);
      navigate('/');
    } catch (err) {
      // Здесь t() можно оставить, так как это редкое событие (ошибка API)
      form.setFieldError('password', t(`errors.${err.message}`));
    } finally {
      setLoading(false);
    }
  };
 console.count('LoginForm render');
 
  return (
    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      <Title order={2} ta="center" mb="lg">
        {t('auth.loginTitle')}
      </Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            label={t('auth.userNickname')}
            placeholder={t('auth.username')}
            {...form.getInputProps('username')}
          />
          <PasswordInput
            label={t('auth.password')}
            placeholder={t('auth.password')}
            {...form.getInputProps('password')}
          />
          <Button type="submit" fullWidth mt="md" loading={loading}>
            {t('auth.loginButton')}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}

export default LoginForm;