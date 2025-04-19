import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/knowledge-spaces/',
  plugins: [react()],
  server: {
    proxy: {
      '/proxy': {
        target: 'http://54.198.139.161',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/proxy/, ''),
      },
    },
  },
  css: {
    postcss: './postcss.config.js',
  },
});
