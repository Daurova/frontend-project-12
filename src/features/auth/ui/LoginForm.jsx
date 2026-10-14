import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Button, Paper, Title, Stack } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { login } from '../../../shared/auth.js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../../app/store/authStore.js';

function LoginForm() {
  const { t } = useTranslation();                 
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const authLogin = useAuthStore((state) => state.login);

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
      form.setFieldError('password', t(`errors.${err.message}`));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      <Title order={2} ta="center" mb="lg">
        {t('auth.loginTitle')}                        {/* ← было "Вход в чат" */}
      </Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            label={t('auth.username')}                
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


export default LoginForm