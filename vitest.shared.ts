export const sharedTestConfig = {
  globals: true,
  environment: 'jsdom' as const,
  setupFiles: ['./test-setup.ts'],
  coverage: {
    provider: 'v8' as const,
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
};
