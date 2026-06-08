import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.js",

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
      all: false,
      reportsDirectory: "coverage",
      include: ["src/**/*.{js,jsx}"],
      exclude: [
        "src/test/**",
        "src/**/*.test.*",
        "src/**/*.spec.*",
        "src/main.jsx",
        "src/app/**",
        "src/pages/**",
        "src/**/components/**",
        "src/**/constants/**",
        "src/**/data/**",
      ],
    },
  },
});
