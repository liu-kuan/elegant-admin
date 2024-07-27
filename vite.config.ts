import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { fileURLToPath, URL } from 'node:url'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import buildOptions from './build/build-options'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ['vue', 'vue-router', 'pinia'],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dirs: ['src/components'],
    }),
    UnoCSS(),
    Icons({
      // Scale of icons against 1em
      scale: 1,
      compiler: 'vue3',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 8888,
    // open: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import '@/styles/colors.scss';
          @import '@/styles/text.scss';
          @import '@/styles/layout.scss';
          @import '@/styles/main.scss';
        `,
      },
    },
  },
  base: '/app/admin/',
  build: buildOptions,
})
