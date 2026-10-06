import { Paper, Title, Text, Anchor, Container } from '@mantine/core';
import { Navigate, Link } from 'react-router-dom';
import useAuthStore from '../../app/store/authStore';
import { SignupForm } from '../../features/auth/ui/SignupForm';

function SignUpPage() {
  const token = useAuthStore((state) => state.token);

  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <Container size={420} my={40}>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Title order={2} ta="center" mb="lg">
          Регистрация
        </Title>
        <SignupForm />
        <Text c="dimmed" size="sm" ta="center" mt="md">
          Уже есть аккаунт?{' '}
          <Anchor component={Link} to="/login" size="sm">
            Войти
          </Anchor>
        </Text>
      </Paper>
    </Container>
  );
}

export default SignUpPage