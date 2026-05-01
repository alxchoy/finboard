import { federation } from '@module-federation/vite';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: __dirname,
  build: {
    target: 'esnext',
    outDir: '../../dist/apps/analytics',
  },
  plugins: [
    react(),
    federation({
      name: 'analytics',
      filename: 'remoteEntry.js',
      exposes: { './Analytics': './src/App.tsx' },
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
  server: { port: 3003 },
});
