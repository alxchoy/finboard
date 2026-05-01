import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';

export default defineConfig({
  root: __dirname,
  build: {
    target: 'esnext',
    modulePreload: false,
    minify: false,
    cssCodeSplit: false,
    outDir: '../../dist/apps/shell',
  },
  plugins: [
    react(),
    federation({
      name: 'shell',
      manifest: true,
      remotes: {
        portfolio: {
          type: 'module',
          name: 'portfolio',
          entry: 'http://localhost:3001/remoteEntry.js',
        },
        market: {
          type: 'module',
          name: 'market',
          entry: 'http://localhost:3002/remoteEntry.js',
        },
        analytics: {
          type: 'module',
          name: 'analytics',
          entry: 'http://localhost:3003/remoteEntry.js',
        },
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18' },
        'react-dom': { singleton: true, requiredVersion: '^18' },
      },
      dts: false,
    }),
  ],
  optimizeDeps: {
    exclude: ['react', 'react-dom'],
  },
  server: { port: 3000 },
});
