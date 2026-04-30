import { crx } from '@crxjs/vite-plugin';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import manifest from './manifest.json';

export default defineConfig(({ command }) => ({
  plugins: [react(), crx({ manifest })],
  base: command === 'serve' ? '/' : './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    cors: {
      origin: [/chrome-extension:\/\//],
    },
  },
}));
