import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    fileParallelism: false,
    coverage: {
      provider: "v8", // or 'istanbul'
      enabled: true,
    },
    setupFiles: "setupTest.ts",
  },
});
