import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      all: false,

      include: [
        'src/**/*.{js,jsx,ts,tsx}',
      ],

      exclude: [
        // Tests
        'src/test/**',
        'src/**/*.test.*',
        'src/**/*.spec.*',

        // Entrada de la app
        'src/main.jsx',
        'src/app/**',
        'src/pages/**',

        // UI
        'src/**/components/**',

        // Constantes y mocks
        'src/**/constants/**',
        'src/**/data/**',
      ],
    },
  },
})
