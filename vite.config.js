import dotenvExpand from 'dotenv-expand';
import { loadEnv, defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig(({ mode }) => {
  if (mode === 'development') {
    const env = loadEnv(mode, process.cwd(), '');
    dotenvExpand.expand({ parsed: env });
  };
  return {
    plugins: [react()],
    resolve: {
      extensions: ['.js', '.ts', '.jsx', '.tsx'],
    }
  };
});