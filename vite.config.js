import dotenvExpand from 'dotenv-expand';
import { loadEnv, defineConfig } from 'vite';
import vercel from 'vite-plugin-vercel';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  dotenvExpand.expand({ parsed: env });

  const envWithProcessPrefix = Object.keys(env).reduce((prev, curr) => {
    const validKey = curr.replace(/[^\w]/g, '_');
    prev[`process.env.${validKey}`] = JSON.stringify(env[curr]);
    return prev;
  }, {});

  return {
    plugins: [vercel()],
    define: envWithProcessPrefix,
    resolve: {
      extensions: ['.js', '.ts', '.jsx', '.tsx']
    }
  };
});