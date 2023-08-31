import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import solidDevtools from 'solid-devtools/vite';
import path from 'node:path';

export default defineConfig({
  server: {
    port: 6783,
    strictPort: true,
  },
  base: './',
  build: {
    target: 'esnext',
    outDir: path.resolve(__dirname, '../docs'),
  },
  plugins: [
    solidDevtools({
      autoname: true,
      locator: {
        targetIDE: 'vscode',
        componentLocation: true,
        jsxLocation: true,
      },
    }),
    solidPlugin({
      include: 'src/**/*',
      extensions: ['jsx', 'tsx', 'js', 'ts'],
    }),
  ],
});
