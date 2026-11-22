// src/store/authStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const createAuthStore = () =>
  create(
    persist(
      (set) => ({
        token: null,
        user: null,
        login: (token, userData) => set({ token, user: { username: userData } }),
        logout: () => set({ token: null, user: null }),
      }),
      { name: 'auth-storage' },
    ),
  );
