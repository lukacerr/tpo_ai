import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import Pages from 'vite-plugin-pages';
import path from 'path';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, '../') };

  return defineConfig({
    plugins: [react(), Pages()],
    resolve: {
      alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    },
    envDir: '../',
    server: {
      host: true,
      port: Number(process.env.VITE_PORT),
      watch: {
        usePolling: true,
      },
    },
  });
};
