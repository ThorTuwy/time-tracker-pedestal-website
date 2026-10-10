import preact from '@preact/preset-vite'
import { defineConfig } from 'vite'
import { compression } from 'vite-plugin-compression2'
import fs from 'fs';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [preact(),compression({
    algorithms: [
      'gzip',
    ]
  }),
    {
      name: 'serve-dev-only-files',
      apply: 'serve',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const cleanUrl = req.url?.split('?')[0].slice(1);
          if(!cleanUrl) return next();

          const devFilePath = path.resolve(import.meta.dirname, 'dev_public', cleanUrl);
          if (fs.existsSync(devFilePath) && fs.statSync(devFilePath).isFile()) {
            return fs.createReadStream(devFilePath).pipe(res);
          }
          next();
        });
      },
    },],
})
