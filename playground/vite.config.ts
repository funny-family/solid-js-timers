import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import solidDevtools from 'solid-devtools/vite';

export default defineConfig({
  server: {
    port: 6783,
    strictPort: true,
  },
  build: {
    target: 'esnext',
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
