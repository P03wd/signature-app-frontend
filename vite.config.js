import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "https://signature-app-backend-5uvj.onrender.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
