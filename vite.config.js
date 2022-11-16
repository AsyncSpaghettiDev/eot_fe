import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://eotapp.alwaysdata.net/',
            },
        },
        open: true,
    },
    build: {
        outDir: 'dist',
    },
    plugins: [react()]
})