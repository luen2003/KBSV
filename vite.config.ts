import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
// import eslint from "vite-plugin-eslint";
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tsconfigPaths()],
    define: {
      __APP_ENV__: env.APP_ENV,
      global: "window"
    },
    base: "",
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, "index.html")
        }
      }
    }
  };
});
