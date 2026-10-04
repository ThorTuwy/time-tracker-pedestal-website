import preact from '@preact/preset-vite'
import { defineConfig } from 'vite'
import { compression } from 'vite-plugin-compression2'

// https://vite.dev/config/
export default defineConfig({
  plugins: [preact(),compression({
    algorithms: [
      'brotliCompress',
    ]
  })],
})
