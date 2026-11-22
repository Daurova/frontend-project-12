import { AuthStoreContext, ChatStoreContext } from './storeContexts.js';

export const StoreProvider = ({ authStore, chatStore, children }) => (
  <AuthStoreContext.Provider value={authStore}>
    <ChatStoreContext.Provider value={chatStore}>
      {children}
    </ChatStoreContext.Provider>
  </AuthStoreContext.Provider>
);
