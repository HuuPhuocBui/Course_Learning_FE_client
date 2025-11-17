import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://gateway.internstudy.click',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, '')
  //     }
  //   }
  // },
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 90,
    strictPort: true,
    allowedHosts: ['fe.internstudy.click'],
  },
});
