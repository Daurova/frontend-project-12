import { useQuery } from '@tanstack/react-query';
import useAuthStore from '../../../app/store/authStore';
import { getMessages } from '../api/message-api';

export const useMessages = () => {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ['messages'],
    queryFn: () => getMessages(token),
    enabled: !!token,
  });
};