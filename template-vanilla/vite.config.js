/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  root: './src',
  build: {
    outDir: '../dist',
  }
});
