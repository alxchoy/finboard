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
    outDir: '../../dist/apps/portfolio',
  },
  plugins: [
    react(),
    federation({
      name: 'portfolio',
      manifest: true,
      filename: 'remoteEntry.js',
      exposes: { './Portfolio': './src/App.tsx' },
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
  server: { port: 3001 },
});
