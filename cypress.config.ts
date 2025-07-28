import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },

  e2e: {
    env: {
      apiUrl: "http://localhost:3000",
    },
    supportFile: "cypress/support/e2e.ts",
  },
});
