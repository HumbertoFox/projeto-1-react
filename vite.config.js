import dotenvExpand from 'dotenv-expand';
import { loadEnv, defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig(({ mode }) => {
  if (typeof process !== 'undefined' || mode === 'development') {
    const env = loadEnv(mode, process.cwd(), '');
    dotenvExpand.expand({ parsed: env });
  };
  const config = {
    apiKey: process.env.REACT_APP_API_KEY,
  };
  return {
    plugins: [react()],
    define: {
      'process.env': {
        REACT_APP_API_KEY: JSON.stringify(config.apiKey)
      }
    },
    resolve: {
      extensions: ['.js', '.ts', '.jsx', '.tsx'],
    }
  };
});