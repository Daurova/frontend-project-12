import { Text, Anchor, Container } from '@mantine/core';
import { Navigate, Link } from 'react-router-dom';
import useAuthStore from '../../app/store/authStore';
import LoginForm from '../../features/auth/ui/LoginForm';

function LogInPage() {
  const token = useAuthStore((state) => state.token);

  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <Container size={420} my={40}>
        <LoginForm/>
        <Text c="dimmed" size="sm" ta="center" mt="md">
          Нет аккаунта?{' '}
          <Anchor component={Link} to="/signup" size="sm">
            Регистрация
          </Anchor>
        </Text>
    </Container>
  );
}

export default LogInPage