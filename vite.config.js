import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Remove the css.postcss configuration or point to your config file
  optimizeDeps: {
    include: ['firebase/app', 'firebase/auth'],
  },
  build: {
    rollupOptions: {
      external: [],
    },
  },
});