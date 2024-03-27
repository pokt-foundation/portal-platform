import { vitePlugin as remix } from "@remix-run/dev"
import { installGlobals } from "@remix-run/node"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

installGlobals()

export default defineConfig({
  server: {
    port: 3000,
  },
  base: "",
  plugins: [remix(), tsconfigPaths()],
  build: {
    rollupOptions: {
      external: ["~/models/portal/sdk"],
    },
  },
})
