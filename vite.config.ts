import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 与 dev 共用：否则 `vite preview` / 静态预览时请求仍发到 4173，会 404 Not Found
const apiProxy = {
  '/api': {
    target: 'http://localhost:8000',
    changeOrigin: true,
    rewrite: (path: string) => path.replace(/^\/api/, '')
  }
} as const

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // 明确监听所有网卡，避免仅 IPv6/localhost 解析异常时用 127.0.0.1 仍连不上
    host: true,
    port: 3001,
    strictPort: false,
    proxy: apiProxy
  },
  preview: {
    host: true,
    port: 3001,
    strictPort: false,
    proxy: apiProxy
  }
})