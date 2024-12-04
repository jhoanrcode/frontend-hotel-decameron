import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default ({ mode }) => {

    process.env = {...process.env, ...loadEnv(mode, process.cwd())};

    return defineConfig({
      base: "/frontend-hotel-decameron/",
    
      plugins: [vue()],
      resolve: {
        alias: {
          "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
      },
      server: {
        port: parseInt(process.env.VITE_PORT) || 3001,

      }
    })
};
