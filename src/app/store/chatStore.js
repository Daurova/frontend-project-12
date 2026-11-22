// src/store/chatStore.js
import { create } from 'zustand';

export const createChatStore = () =>
  create((set) => ({
    currentChannelId: null,
    setCurrentChannelId: (id) => set({ currentChannelId: id }),

    isAddModalOpen: false,
    openAddModal: () => set({ isAddModalOpen: true }),
    closeAddModal: () => set({ isAddModalOpen: false }),

    isRenameModalOpen: false,
    channelToRename: null,
    openRenameModal: (channel) => set({ isRenameModalOpen: true, channelToRename: channel }),
    closeRenameModal: () => set({ isRenameModalOpen: false, channelToRename: null }),

    isRemoveModalOpen: false,
    channelToRemove: null,
    openRemoveModal: (channel) => set({ isRemoveModalOpen: true, channelToRemove: channel }),
    closeRemoveModal: () => set({ isRemoveModalOpen: false, channelToRemove: null }),
  }));
