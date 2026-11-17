import { create } from 'zustand';

// Динамически проверяем, доступен ли persist и не находимся ли мы в тестах
let useAuthStore;

if (process.env.NODE_ENV === 'test') {
  // 1. РЕЖИМ ТЕСТОВ: создаем обычный стор в памяти
  useAuthStore = create((set) => ({
    token: null,
    user: null,
    login: (token, user) => set({ token, user }),
    logout: () => set({ token: null, user: null }),
  }));
} else {
  // 2. РЕЖИМ РАЗРАБОТКИ/БОЯ: подключаем persist
  const { persist } = require('zustand/middleware');

  useAuthStore = create(
    persist(
      (set) => ({
        token: null,
        user: null,
        login: (token, user) => set({ token, user }),
        logout: () => set({ token: null, user: null }),
      }),
      {
        name: 'auth-storage',
        // 3. ЗАЩИТА ДЛЯ REACT 19: сохраняем только данные, а не функции
        partialize: (state) => ({
          token: state.token,
          user: state.user,
        }),
      }
    )
  );
}

export default useAuthStore;