import { defineConfig } from 'vite';
import { CodeInspectorPlugin } from 'code-inspector-plugin';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';

// https://cn.vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    CodeInspectorPlugin({
      bundler: 'vite',
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 11011,
  },
  build: {
    assetsInlineLimit: 0,
  },
});
