import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    port: 8080,
  },
  plugins: [!process.env.VITEST && reactRouter(), tailwindcss(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./app/test/setup.ts'],
    coverage: {
      reporter: ["text", "json", "html"],
      reportsDirectory: "coverage"
    },
    reporters: ["default", "junit"],
    outputFile: "junit.xml"
  }
});
