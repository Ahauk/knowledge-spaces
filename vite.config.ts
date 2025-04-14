import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/proxy': {
        target: 'http://35.173.135.93',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/proxy/, ''),
      },
    },
  },
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
});
