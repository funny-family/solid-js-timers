import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import dts from 'vite-plugin-dts';
import path from 'node:path';

export default defineConfig(() => {
  const entry = path.resolve(__dirname, './lib/index.ts');

  return {
    plugins: [
      solidPlugin({
        include: 'lib/**/*',
        extensions: ['jsx', 'tsx', 'js', 'ts'],
      }),
      dts({
        rollupTypes: true,
        outputDir: path.resolve(__dirname, './dist'),
      }),
    ],
    build: {
      target: 'esnext',
      minify: false,
      lib: {
        entry,
        name: 'solid-js-timers',
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
        input: {
          entry,
        },
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
  };
});
