import { reactRouter } from "@react-router/dev/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    !process.env.VITEST && reactRouter(),
    tsconfigPaths(),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./app/test/setup.ts"],
    coverage: {
      reporter: ["text", "json", "html"],
      reportsDirectory: "coverage",
    },
    reporters: ["default", "junit"],
    outputFile: "junit.xml",
  },
});
