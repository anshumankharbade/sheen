import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        // Use a function instead of an object
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Group react, react-dom, react-router-dom into 'vendor'
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor';
            }
            // All other node_modules go to 'vendor' as well (or you can split further)
            return 'vendor';
          }
        }
      }
    }
  },
  server: {
    port: 5173
  }
});
