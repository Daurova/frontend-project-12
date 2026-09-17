import { createRoot } from 'react-dom/client'
import init from './init.jsx'
import { io } from 'socket.io-client';
import '@mantine/core/styles.css'

const app = async () => {
  const root = createRoot(document.querySelector("#chat"));
  const socket = io();
  window.debugSocket = socket;

  root.render(await init(socket));
};


app();

