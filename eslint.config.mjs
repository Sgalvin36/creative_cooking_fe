import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import prettier from "eslint-plugin-prettier";
import ts from "typescript";

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
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
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
      "prettier/prettier": "warn",
      ...tseslint.configs.recommended.rules,
      ...prettier.configs.recommended.rules,
    },
  },
]);
