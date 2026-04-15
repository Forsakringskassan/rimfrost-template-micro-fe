import { resolve } from "node:path";
import { URL, fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import federation from "@originjs/vite-plugin-federation";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    federation({
      name: "remoteExample",
      filename: "remoteEntry.js",
      exposes: {
        "./ExampleComponent": "./src/components/ExampleComponent.vue",
      },
      shared: ["vue", "@fkui/vue", "pinia"],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  preview: {
    port: process.env.VITE_APP_PORT ? parseInt(process.env.VITE_APP_PORT) : 3039,
    cors: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:9009",
        changeOrigin: true,
    }},
    port: process.env.VITE_APP_PORT_DEV ? parseInt(process.env.VITE_APP_PORT_DEV) : 3038,
  },
  define: { "process.env": '"production"' },
  build: {
    cssCodeSplit: false,
    lib: {
      formats: ["es"],
      entry: resolve(__dirname, "src/main.ts"),
      name: "exampleComponent",
    },
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) {
            return "assets/exampleComponent.css";
          }
          return assetInfo.name ?? "assets/[name][extname]";
        },
      },
    },
  },
});
