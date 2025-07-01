import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000' // proxy API calls during local development
    }
  },
  build: {
    outDir: 'kulture-backend/client-dist', // move build output into the backend folder
    emptyOutDir: true
  }
})
