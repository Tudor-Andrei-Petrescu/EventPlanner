import { defineConfig } from 'vite'
import dns from 'node:dns'
import react from '@vitejs/plugin-react-swc'

dns.setDefaultResultOrder('verbatim')
// https://vitejs.dev/config/
export default defineConfig({
  build:{
    outDir:'../API/wwwroot'
  },
  server:{
    port:3000
  },
  plugins: [react()],
})
