import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { playwright } from '@vitest/browser-playwright'


export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5001',
        changeOrigin: true,
      },
      '/socket.io': {
        target: 'http://127.0.0.1:5001',
        ws: true,
        changeOrigin: true,
      },
    },
  },
  test: {         
    css: true, 
    testTimeout: 30000, 
    browser: {
      provider: playwright(),
      // Заставляем Playwright сохранять трейс при падении
      trace: {
        mode: 'retain-on-failure',
        tracesDir: './tmp/artifacts/traces', // <--- ДОБАВЬ ЭТО
      },
    },
    
  },
})