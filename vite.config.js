import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import';
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0'
  },
  plugins: [
    vue(),
    // 按需引入vant
    styleImport({
      libs: [
        {
          libraryName: 'vant',
          esModule: true,
          resolveStyle: (name) => `vant/es/${name}/style/index`,
        },
      ],
    })
  ],
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    target: 'modules',
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true
      }
    },
  },
})
