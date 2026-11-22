import { useContext } from 'react';
import { useStore } from 'zustand';
import { ChatStoreContext } from './storeContexts.js';

export const useChatStore = (selector) => {
  const store = useContext(ChatStoreContext);
  return useStore(store, selector);
};
