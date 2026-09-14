import { create } from 'zustand';

const useChatStore = create((set) => ({
  currentChannelId: null,
  setCurrentChannelId: (id) => set({ currentChannelId: id }),
  
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));

export default useChatStore;