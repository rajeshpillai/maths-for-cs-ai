import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solid()],
  // For GitHub Pages: set base to repo name
  // For custom domain or Netlify: leave as '/'
  base: process.env.GITHUB_PAGES === 'true' ? '/maths-for-cs-ai/' : '/',
})
