import { Paper, Title, Text, Anchor, Container } from '@mantine/core';
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
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Title order={2} ta="center" mb="lg">
          Вход в чат
        </Title>
        <LoginForm/>
        <Text c="dimmed" size="sm" ta="center" mt="md">
          Нет аккаунта?{' '}
          <Anchor component={Link} to="/signup" size="sm">
            Зарегистрироваться
          </Anchor>
        </Text>
      </Paper>
    </Container>
  );
}

export default LogInPage