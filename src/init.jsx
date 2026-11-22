// src/init.jsx
import debug from "debug";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider, QueryCache } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { notifications } from "@mantine/notifications";
import { I18nextProvider } from "react-i18next";
import { createI18n } from "./shared/i18n/index";
import { Notifications } from "@mantine/notifications";
import * as Sentry from "@sentry/react";
import { createAuthStore } from "./app/store/authStore.js";
import { createChatStore } from "./app/store/chatStore.js";
import { StoreProvider } from "./app/store/StoreProvider.jsx";
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

const logSocket = debug("chat:socket");

const init = async (socket) => {
  // Клиент создаётся на каждый запуск приложения —
  // никакого состояния между запусками и тестами
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: Infinity,
      },
    },
    queryCache: new QueryCache({
      onError: () => {
        notifications.show({
          title: 'Ошибка',
          message: 'Ошибка соединения',
          color: 'red',
        });
      },
    }),
  });

  // Новый экземпляр i18n на каждый запуск вместо синглтона из модуля
  const i18n = createI18n();

  // Сторы тоже фабрики: свежий экземпляр на каждый запуск
  const authStore = createAuthStore();
  const chatStore = createChatStore();

  socket.on("newMessage", logSocket);

  return (
    <I18nextProvider i18n={i18n}>
      <StoreProvider authStore={authStore} chatStore={chatStore}>
        <MantineProvider>
          <Notifications position="top-center" />
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <Sentry.ErrorBoundary fallback={<p>Что-то пошло не так</p>}>
                <App socket={socket} />
              </Sentry.ErrorBoundary>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </MantineProvider>
      </StoreProvider>
    </I18nextProvider>
  );
};

export default init;
