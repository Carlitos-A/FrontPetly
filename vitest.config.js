import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./tests/setup.js",

    include: [
      "src/**/*.{test,spec}.{js,jsx}",
      "tests/unit/**/*.{test,spec}.{js,jsx}",
    ],

    exclude: [
      "tests/e2e/**",
      "node_modules/**",
      "dist/**",
      "coverage/**",
      "playwright-report/**",
      "playwright-coverage/**",
      "test-results/**",
    ],

    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      reportsDirectory: "coverage",
      include: ["src/**/*.{js,jsx}"],
      exclude: [
        "src/main.jsx",
        "src/assets/**",
        "src/**/*.test.{js,jsx}",
        "src/**/*.spec.{js,jsx}",
      ],
    },
  },
});