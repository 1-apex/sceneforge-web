import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React — tiny, loads first
          'react-core': ['react', 'react-dom', 'react-router-dom'],
          // Three.js — large, only needed for 3D views
          'three-core': ['three'],
          // R3F / Drei — loaded after Three.js
          'r3f': ['@react-three/fiber', '@react-three/drei'],
        },
      },
    },
    // Raise the warning threshold slightly (three.js is inherently big)
    chunkSizeWarningLimit: 1000,
  },
})
