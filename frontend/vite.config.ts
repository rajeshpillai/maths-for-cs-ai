import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

const BACKEND_URL = process.env.VITE_API_URL ?? 'http://localhost:8000'

export default defineConfig({
  plugins: [solid()],
  // For GitHub Pages: set base to repo name
  // For custom domain or Netlify: leave as '/'
  base: process.env.GITHUB_PAGES === 'true' ? '/maths-for-cs-ai/' : '/',
  server: {
    proxy: {
      '/api': {
        target: BACKEND_URL,
        changeOrigin: true,
      },
    },
  },
})
