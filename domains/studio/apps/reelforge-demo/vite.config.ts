import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { agentTail } from "agent-tail/vite";

export default defineConfig({
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    agentTail(),
    ...tanstackStart(),
  ],
});
