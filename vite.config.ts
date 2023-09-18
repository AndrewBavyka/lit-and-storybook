import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      fileName: 'index',
      entry: './main.ts',
      formats: ['es'],
    },
    minify: 'esbuild',
    rollupOptions: {
      // external: /^lit/
    },
  },
})