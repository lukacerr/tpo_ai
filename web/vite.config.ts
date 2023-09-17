import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, '../') };

  return defineConfig({
    plugins: [react()],
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
