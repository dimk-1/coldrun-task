import { fileURLToPath, URL } from 'node:url';

import { defineConfig, loadEnv } from 'vite';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import vue from '@vitejs/plugin-vue';
import VueDevTools from 'vite-plugin-vue-devtools';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = Object.assign(process.env, loadEnv(mode, process.cwd(), ''));

  return {
    plugins: [vue(), VueDevTools(), VueI18nPlugin({})],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      cors: false,
      port: Number(process.env?.UI_PORT ?? 8080),
      host: '0.0.0.0',
      proxy: {
        '/api': {
          target: process.env?.API_HOST ?? 'http://localhost:3000/api',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  };
});
