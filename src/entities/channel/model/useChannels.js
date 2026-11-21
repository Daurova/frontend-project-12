import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAuthStore from '../../../app/store/authStore';
import { createChannel, getChannels, removeChannel, renameChannel } from '../api/channel-api';
import useChatStore from '../../../app/store/chatStore';

export const useChannels = () => {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ['channels'],
    queryFn: () => getChannels(token),
    enabled: !!token,
  });
};

export const useCreateChannel = () => {
  const queryClient = useQueryClient();
  const token = useAuthStore((state) => state.token);
  // Добавляем setCurrentChannelId из стора
  const setCurrentChannelId = useChatStore((state) => state.setCurrentChannelId);

  return useMutation({
    mutationFn: (name) => createChannel(token, name),
    networkMode: 'always',
    // Добавляем data в аргументы onSuccess
    onSuccess: (data) => { // <--- ВОТ ЗДЕСЬ
      queryClient.invalidateQueries({ queryKey: ['channels'] });
      setCurrentChannelId(data.id); // <--- ТЕПЕРЬ data существует
    },
  });
};

export const useRenameChannel = () => {
  const queryClient = useQueryClient();
  const token = useAuthStore((state) => state.token);

  return useMutation({
    mutationFn: ({ id, name }) => renameChannel(token, id, name),
    networkMode: 'always',
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['channels'] });
    },
  });
};

export const useRemoveChannel = () => {
  const queryClient = useQueryClient();
  const token = useAuthStore((state) => state.token);

  return useMutation({
    mutationFn: (id) => removeChannel(token, id),
    networkMode: 'always',
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['channels'] });
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });
};