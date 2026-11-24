import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Target modern browsers — smaller, faster bundles
    target: 'es2020',
    // Improve chunk caching: separate vendor code from app code
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }
          if (
            id.includes('node_modules/gsap') ||
            id.includes('node_modules/lenis') ||
            id.includes('node_modules/@gsap')
          ) {
            return 'animation-vendor';
          }
          if (id.includes('node_modules/three')) {
            return 'three-vendor';
          }
          if (id.includes('node_modules/react-icons')) {
            return 'icons-vendor';
          }
        },
      },
    },
    // Warn when chunk exceeds 400 kB instead of default 500
    chunkSizeWarningLimit: 400,
  },
  // Optimise dev server pre-bundling
  optimizeDeps: {
    include: ['react', 'react-dom', 'gsap', 'lenis'],
  },
})
