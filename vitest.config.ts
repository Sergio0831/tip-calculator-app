// global.d.ts
/// <reference types="vite/client" />
/// <reference types="vitest/globals" />
/// <reference types="vitest" />

import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./vitest.setup.ts'],
    },
  }),
);
