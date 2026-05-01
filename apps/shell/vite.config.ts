import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';

export default defineConfig({
  root: __dirname,
  build: {
    target: 'esnext',
    outDir: '../../dist/apps/shell',
  },
  plugins: [
    react(),
    federation({
      name: 'shell',
      remotes: {
        portfolio: 'http://localhost:3001/remoteEntry.js',
        market: 'http://localhost:3002/remoteEntry.js',
        analytics: 'http://localhost:3003/remoteEntry.js',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18' },
        'react-dom': { singleton: true, requiredVersion: '^18' },
      },
      dts: false,
    }),
  ],
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  server: { port: 3000 },
});
