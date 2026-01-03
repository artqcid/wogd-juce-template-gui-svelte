import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig(({ mode }) => ({
  plugins: [svelte()],
  // Im Dev-Modus absolute Pfade, im Build relative Pfade für JUCE
  base: mode === 'development' ? '/' : './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Für JUCE-Debugging hilfreich
    minify: false,
    sourcemap: true
  },
  server: {
    port: 5173,
    strictPort: true,
    host: 'localhost'
  }
}))
