import react from '@vitejs/plugin-react-swc';
import { codeInspectorPlugin } from 'code-inspector-plugin';
import type { UserConfig } from 'vite';

// https://vitejs.dev/config/
export const viteConfig: UserConfig = {
  plugins: [
    react(),
    codeInspectorPlugin({
      bundler: 'vite',
    }),
  ],
};
