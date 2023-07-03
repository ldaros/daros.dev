import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react-swc";
import dotenv from "dotenv";

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  define: {
    "process.env": process.env,
  },

  resolve: {
    alias: {
      "~": fileURLToPath(new URL("./src/", import.meta.url)),
      "@unix": fileURLToPath(new URL("./src/features/unix/", import.meta.url)),
      mixins: fileURLToPath(
        new URL("./src/styles/mixins.scss", import.meta.url)
      ),
      variables: fileURLToPath(
        new URL("./src/styles/variables.scss", import.meta.url)
      ),
    },
  },
});
