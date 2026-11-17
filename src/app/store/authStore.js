// src/app/store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null, // Теперь это будет объект

      login: (token, userData) => set({ token, user: { username: userData } }),
      logout: () => set({ token: null, user: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);


export default useAuthStore