import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

import { sharedTestConfig } from '../../vitest.shared';

export default defineConfig({
  plugins: [react()],
  test: {
    ...sharedTestConfig,
  },
});
