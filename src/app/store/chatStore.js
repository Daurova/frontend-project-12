import { create } from 'zustand';

const useChatStore = create((set) => ({
  // Текущий канал
  currentChannelId: null,
  setCurrentChannelId: (id) => set({ currentChannelId: id }),

  // Модальное окно
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),

  // Добавление канала
  isAddModalOpen: false,
  openAddModal: () => set({ isAddModalOpen: true }),
  closeAddModal: () => set({ isAddModalOpen: false }),

  // Переименование канала
  isRenameModalOpen: false,
  channelToRename: null,
  openRenameModal: (channel) =>
    set({ isRenameModalOpen: true, channelToRename: channel }),
  closeRenameModal: () =>
    set({ isRenameModalOpen: false, channelToRename: null }),

  // Удаление канала
  isRemoveModalOpen: false,
  channelToRemove: null,
  openRemoveModal: (channel) =>
    set({ isRemoveModalOpen: true, channelToRemove: channel }),
  closeRemoveModal: () =>
    set({ isRemoveModalOpen: false, channelToRemove: null }),
}));

export default useChatStore;