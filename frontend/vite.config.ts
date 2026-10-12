import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks(id: string) {
                    if (!id.includes('node_modules')) return

                    if (/node_modules\/(react|react-dom|react-router|react-router-dom|scheduler)\//.test(id)) {
                        return 'react'
                    }
                    if (/node_modules\/(mobx|mobx-react-lite)\//.test(id)) {
                        return 'mobx'
                    }
                },
            },
        },
    },
})