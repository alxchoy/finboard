import { federation } from '@module-federation/vite';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: __dirname,
  build: {
    target: 'esnext',
    modulePreload: false,
    minify: false,
    cssCodeSplit: false,
    outDir: '../../dist/apps/market',
  },
  plugins: [
    react(),
    federation({
      name: 'market',
      filename: 'remoteEntry.js',
      exposes: { './Market': './src/App.tsx' },
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
  server: { port: 3002 },
});
