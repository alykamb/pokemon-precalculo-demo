// eslint-disable-next-line import/no-extraneous-dependencies
import reactRefresh from '@vitejs/plugin-react-refresh'
import { resolve } from 'path'
// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vite'

const port = process.env?.CLIENT_PORT ? +process.env.CLIENT_PORT : 33444

export default defineConfig({
    plugins: [reactRefresh()],
    server: {
        port,
        hmr: {
            host: 'localhost',
            port,
            protocol: 'ws',
        },
    },
    define: {
        'process.env': {},
    },
    resolve: {
        alias: [{ find: '@', replacement: resolve(__dirname, 'src') }],
    },
})
