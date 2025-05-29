import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  root: path.resolve(__dirname),
  cacheDir: path.resolve(__dirname, '../../node_modules/.vite/client_cache'),
  plugins: [react(), tailwindcss()],
})
