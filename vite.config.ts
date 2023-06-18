import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "~": fileURLToPath(new URL("./src/", import.meta.url)),
      "@unix": fileURLToPath(new URL("./src/features/unix/", import.meta.url)),
      "mixins": fileURLToPath(new URL("./src/styles/mixins.scss", import.meta.url)),
      "variables": fileURLToPath(new URL("./src/styles/variables.scss", import.meta.url)),
    },
  },
});
