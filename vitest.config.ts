import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'app'),
      '~~': path.resolve(__dirname),
      '@': path.resolve(__dirname, 'app'),
    },
  },
  test: {
    // ...
  },
});
