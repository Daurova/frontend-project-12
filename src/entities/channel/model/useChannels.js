import { useQuery } from '@tanstack/react-query';
import useAuthStore from '../../../app/store/authStore';
import { getChannels } from '../api/channel-api';

export const useChannels = () => {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ['channels'],
    queryFn: () => getChannels(token),
    enabled: !!token,
  });
};