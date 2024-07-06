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
        REACT_APP_API_KEY: JSON.stringify(config.apiKey),
        POSTGRES_DATABASE: JSON.stringify(env.local.POSTGRES_DATABASE),
        POSTGRES_HOST: JSON.stringify(env.local.POSTGRES_HOST),
        POSTGRES_PASSWORD: JSON.stringify(env.local.POSTGRES_PASSWORD),
        POSTGRES_PRISMA_URL: JSON.stringify(env.local.POSTGRES_PRISMA_URL),
        POSTGRES_URL: JSON.stringify(env.local.POSTGRES_URL),
        POSTGRES_URL_NON_POOLING: JSON.stringify(env.local.POSTGRES_URL_NON_POOLING),
        POSTGRES_URL_NO_SSL: JSON.stringify(env.local.POSTGRES_URL_NO_SSL),
        POSTGRES_USER: JSON.stringify(env.local.POSTGRES_USER)
      }
    },
    resolve: {
      extensions: ['.js', '.ts', '.jsx', '.tsx'],
    }
  };
});