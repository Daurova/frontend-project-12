import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Button, Stack, Alert } from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { signup } from '../../../shared/auth';
import useAuthStore from '../../../app/store/authStore';

function SignUpForm() {
  const { t } = useTranslation(); 
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
        if (!value) return t('validation.required');
        if (value.length < 3) return t('validation.usernameMin');
        if (value.length > 20) return t('validation.usernameMax');
        return null;
      },
      password: (value) => {
        if (!value) return t('validation.required');
        if (value.length < 6) return t('validation.passwordMin');
        return null;
      },
      confirmPassword: (value, values) => {
        if (!value) return t('validation.required');
        if (value !== values.password) return t('validation.passwordMismatch');
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
      setError(t(`errors.${err.message}`));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        {error && (
          <Alert color="red" title={t('errors.signupFailed')}>
            {error}
          </Alert>
        )}

        <TextInput
          label={t('auth.username')}
          placeholder={t('auth.username')}
          disabled={loading}
          {...form.getInputProps('username')}
        />

        <PasswordInput
          label={t('auth.password')}
          placeholder={t('auth.password')}
          disabled={loading}
          {...form.getInputProps('password')}
        />

        <PasswordInput
          label={t('auth.confirmPassword')}
          placeholder={t('auth.confirmPassword')}
          disabled={loading}
          {...form.getInputProps('confirmPassword')}
        />

        <Button type="submit" fullWidth mt="md" loading={loading}>
          {t('auth.signupButton')}
        </Button>
      </Stack>
    </form>
  );
}


export default SignUpForm