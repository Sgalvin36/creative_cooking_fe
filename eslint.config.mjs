import { defineConfig } from "eslint/config";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import pluginReact from "eslint-plugin-react";
import prettier from "eslint-plugin-prettier";

export default defineConfig([
  {
    ignores: [
      "node_modules",
      ".next",
      "/.next/",
      "build",
      "next-env.d.ts",
      "yarn.lock",
      "public",
      "package-lock.json",
      "cypress",
    ],
  },
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
        tsconfigRootDir: process.cwd(),
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      react: pluginReact,
      prettier,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      ...tsPlugin.configs.recommended.rules,
      ...prettier.configs.recommended.rules,
      "prettier/prettier": "warn",
    },
  },
]);
