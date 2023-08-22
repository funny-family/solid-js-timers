import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import path from 'node:path';
import pkg from './package.json';
import tsconfig from './tsconfig.json';

export default defineConfig({
  plugins: [
    dts({
      rollupTypes: true,
      outputDir: path.resolve(__dirname, './dist/types'),
    }),
  ],
  build: {
    target: tsconfig.compilerOptions.target,
    minify: false,
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, './lib/index.ts'),
      name: pkg.name,
      formats: ['es', 'cjs'],
      fileName: (format) => {
        if (format === 'es') {
          return 'esm/index.js';
        }

        if (format === 'cjs') {
          return 'cjs/index.js';
        }

        return '';
      },
    },
    rollupOptions: {
      external: ['solid-js'],
      output: {
        exports: 'named',
        globals: {
          'solid-js': 'solidJs',
        },
      },
    },
    emptyOutDir: false,
  },
});
