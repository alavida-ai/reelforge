import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    ...tanstackStart(),
  ],
  server: {
    watch: {
      // Prevent infinite reload loop — TanStack Router regenerates this file,
      // Vite detects the change, triggers reload, which triggers regen again.
      ignored: ["**/routeTree.gen.ts"],
    },
  },
});
