import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,           // не повторять запросы при ошибке
      refetchOnWindowFocus: false, // не перезапрашивать при фокусе окна
      refetchOnReconnect: false,   // не перезапрашивать при восстановлении сети
      staleTime: Infinity,         // данные никогда не устаревают (для тестов)
    },
  },
});