import { federation } from '@module-federation/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

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
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      exclude: [
        '**/*.stories.*',
        '**/*.spec.*',
        '**/*.test.*',
        '**/index.ts',
        '**/test-setup.ts',
        '**/declarations.d.ts',
      ],
      thresholds: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
  },
  optimizeDeps: {
    exclude: ['react', 'react-dom'],
  },
  server: { port: 3001 },
});
