// src/main.tsx

import React from 'react';
import './instrument';
import { createRoot } from 'react-dom/client';
import init from './init.jsx';
import { io } from 'socket.io-client';
import '@mantine/core/styles.css';

// --- НАЧАЛО ПРЕДОХРАНИТЕЛЯ (ИСПРАВЛЕННЫЙ ВАРИАНТ) ---
let renderCount = 0;
const MAX_RENDERS = 100;

// Сохраняем ссылку на оригинальный useEffect
const originalUseEffect = React.useEffect;

// Перехватываем
React.useEffect = function (...args) {
  const effectFn = args[0];
  const deps = args[1];

  // Создаем обертку
  const wrappedEffect = () => {
    renderCount++;

    if (renderCount > MAX_RENDERS) {
      const bomb = new Error(
        `💥 RENDER BOMB: Component rendered ${renderCount} times. Check the stack below.`
      );
      console.error(bomb);
      
      // Останавливаем тест
      throw bomb;
    }

    // Вызываем ваш оригинальный эффект
    return effectFn();
  };

  // ВАЖНО: Вызываем оригинальный useEffect через call, передавая this и аргументы
  return originalUseEffect.call(this, wrappedEffect, deps);
};
// --- КОНЕЦ ПРЕДОХРАНИТЕЛЯ ---

const app = async () => {
  const root = createRoot(document.querySelector("#chat"));
  const socket = io();
  window.debugSocket = socket;

  root.render(await init(socket));
};

app();