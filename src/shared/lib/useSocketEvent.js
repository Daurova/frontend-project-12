import { useEffect, useRef } from 'react';

export const useSocketEvent = (socket, event, handler) => {
  const handlerRef = useRef(handler);

  // Обновляем ref при каждом рендере, но не вызываем переподписку
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!socket) return;

    // Создаем обертку, которая вызывает актуальный handler из ref
    const listener = (...args) => {
      handlerRef.current(...args);
    };

    socket.on(event, listener);

    return () => {
      socket.off(event, listener);
    };
  }, [socket, event]); // <--- Теперь здесь ТОЛЬКО socket и event!
};