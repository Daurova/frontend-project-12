// src/main.tsx

import React from 'react';
import './instrument';
import { createRoot } from 'react-dom/client';
import init from './init.jsx';
import { io } from 'socket.io-client';
import '@mantine/core/styles.css';

// --- НАЧАЛО ПРЕДОХРАНИТЕЛЯ ---
let renderCount = 0;
const MAX_RENDERS = 10; // Лимит, после которого мы "взрываемся"

const originalConsoleError = console.error;

// Перехватываем useEffect, чтобы считать циклы
React.useEffect = (...args) => {
  const effectFn = args[0];
  
  args[0] = () => {
    renderCount++;
    
    // Если лимит превышен — принудительно падаем
    if (renderCount > MAX_RENDERS) {
      // Создаем ошибку со стеком
      const bomb = new Error(`💥 RENDER BOMB: Component rendered ${renderCount} times. Stack trace:`);
      
      // Печатаем в консоль Actions, чтобы увидеть стек
      originalConsole.error(bomb);
      
      // Принудительно останавливаем JS, чтобы тест упал
      // @ts-ignore
      window.stop?.();
      
      // Выбрасываем ошибку, чтобы Jest/Vitest зафиксировал падение
      throw bomb;
    }
  };

  return React.useEffect.apply(React, args);
};
// --- КОНЕЦ ПРЕДОХРАНИТЕЛЯ ---

const app = async () => {
  const root = createRoot(document.querySelector("#chat"));
  const socket = io();
  window.debugSocket = socket;

  root.render(await init(socket));
};

app();