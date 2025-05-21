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
    // include: ['src/**/*.[Ss]pec.ts', 'test/**/*.[Tt]est.ts'],
    include: ['src/core/Core/Knowledge.Spec.ts'],
    coverage: {
      reporter: ['lcov', 'text', 'html'], // 可选: 'lcov', 'json', 'clover', 'text-summary'
      include: ['lib', 'src'],
      exclude: ['node_modules/', 'test/', 'tools/'], // 排除不想计算覆盖率的文件
      all: true, // 即使文件没有被 import，也会列出覆盖率
    },
  },
});
