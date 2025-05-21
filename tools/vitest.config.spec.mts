import { defineConfig } from 'vitest/config';
import * as path from 'node:path';

export default defineConfig({
  resolve: {
    alias: {
      agentframework: path.resolve(__dirname, './lib/index'),
      '@agentframework/core': path.resolve(__dirname, './src/dependencies/core'),
      '@agentframework/agent': path.resolve(__dirname, './src/dependencies/agent'),
      '@agentframework/domain': path.resolve(__dirname, './src/dependencies/domain'),
    },
  },
  test: {
    environment: 'node',
    globals: true,
    include: ['src/**/*.[Ss]pec.ts'],
  },
});
