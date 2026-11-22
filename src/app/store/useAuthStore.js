import { useContext } from 'react';
import { useStore } from 'zustand';
import { AuthStoreContext } from './storeContexts.js';

export const useAuthStore = (selector) => {
  const store = useContext(AuthStoreContext);
  return useStore(store, selector);
};
