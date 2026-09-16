import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAuthStore from '../../../app/store/authStore';
import { getMessages, sendMessage } from '../api/message-api';

export const useMessages = () => {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ['messages'],
    queryFn: () => getMessages(token),
    enabled: !!token,
  });
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  const token = useAuthStore((state) => state.token);
  const username = useAuthStore((state) => state.user);

  console.log('useSendMessage — token:', token);      // ← проверь
  console.log('useSendMessage — username:', username); // ← проверь

  return useMutation({
    mutationFn: ({ body, channelId }) =>
      sendMessage(token, { body, channelId, username }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
    onError: (error) => {
      console.error('Ошибка отправки:', error); // ← проверь
    },
  });
};