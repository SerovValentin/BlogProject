import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/posts": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false,
      },
      "/users": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false,
      },
      "/comments": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false,
      },
      "/register": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false,
      },
      "/logout": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false,
      },
      "/login": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
