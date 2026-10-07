import { Group, Anchor, Button, Container } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';   
import useAuthStore from '../../../app/store/authStore';

export function Header() {
  const { t } = useTranslation();                 
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
          {t('header.brand')}                     
        </Anchor>

        {token && (
          <Button variant="light" onClick={handleLogout}>
            {t('auth.logoutButton')}              
          </Button>
        )}
      </Group>
    </Container>
  );
}