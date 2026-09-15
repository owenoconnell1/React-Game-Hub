import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === "gh-pages" ? "/React-Game-Hub/" : "/",
  plugins: [react()],
  server: { port: 5173, open: false },
  preview: { port: 5173 },
}));