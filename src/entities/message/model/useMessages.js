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

  return useMutation({
    mutationFn: ({ body, channelId }) =>
      sendMessage(token, { body, channelId, username }),

    onMutate: async (newMessage) => {
      // Отменяем текущие запросы, чтобы не перезаписать оптимистичное обновление
      await queryClient.cancelQueries({ queryKey: ['messages'] });

      // Сохраняем предыдущие данные для отката
      const previousMessages = queryClient.getQueryData(['messages']);

      // Оптимистично добавляем сообщение в кеш
      queryClient.setQueryData(['messages'], (old = []) => [
        ...old,
        {
          id: `temp-${Date.now()}`,
          body: newMessage.body,
          channelId: newMessage.channelId,
          username,
          isPending: true, // флаг, что сообщение ещё не отправлено
        },
      ]);

      return { previousMessages };
    },

    onError: (err, newMessage, context) => {
      // Откатываем оптимистичное обновление при ошибке
      if (context?.previousMessages) {
        queryClient.setQueryData(['messages'], context.previousMessages);
      }
    },

    onSuccess: () => {
      // Обновляем кеш после успешной отправки
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });
};