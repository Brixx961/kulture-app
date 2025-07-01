import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: path.resolve(__dirname, 'kulture-backend/client-dist'), // build output to backend folder
    emptyOutDir: true,
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
})
