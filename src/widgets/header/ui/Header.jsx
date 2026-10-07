import { Group, Anchor, Button, Container, Text } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../../app/store/authStore';

export function Header() {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Container size="lg" h={60}>
      <Group justify="space-between" h="100%">
        <Anchor
          component={Link}
          to="/"
          size="lg"
          fw={700}
          underline="never"
        >
          Hexlet Chat
        </Anchor>

        {token && (
          <Button variant="light" onClick={handleLogout}>
            Выйти
          </Button>
        )}
      </Group>
    </Container>
  );
}