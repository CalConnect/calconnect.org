import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig(({ mode }) => ({
  plugins: [
    RubyPlugin(),
    vue(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './_frontend'),
    },
  },
  css: {
    devSourcemap: true,
  },
  build: {
    // Generate source maps for debugging
    sourcemap: mode === 'development',

    // Optimize chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate Vue into its own chunk if used
          vue: ['vue'],
        },
      },
    },

    // Minification settings
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
      },
    },
  },
}))
