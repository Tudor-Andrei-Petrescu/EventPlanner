import { defineConfig } from 'vite'
import dns from 'node:dns'
import react from '@vitejs/plugin-react-swc'
import mkcert from 'vite-plugin-mkcert'

dns.setDefaultResultOrder('verbatim')
// https://vitejs.dev/config/
export default defineConfig({
  build:{
    outDir:'../API/wwwroot'
  },
  server:{
    port:3000,
    https:true,
  },
  plugins: [react(),mkcert()],
})
