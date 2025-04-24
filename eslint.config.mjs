import js from "@eslint/js";
import globals from "globals";
import tseslint from "@typescript-eslint/eslint-plugin";
import pluginReact from "eslint-plugin-react";
import parserTypeScript from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";
import { defineConfig } from "eslint/config";

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
    ],
  },

  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: { ...globals.browser, ...globals.node },
    },
    extends: [
      "eslint:recommended", // Base ESLint recommended rules
      "plugin:react/recommended", // React linting rules
      "plugin:prettier/recommended", // Prettier integration
      "prettier", // Disabling rules that conflict with Prettier
    ],
    plugins: {
      react: pluginReact, // Make sure react plugin is declared here
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },

  // TypeScript config
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: parserTypeScript,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: 2020,
        sourceType: "module",
      },
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin, // TypeScript plugin
    },
    extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:prettier/recommended", // Prettier config for TS
    ],
    rules: {
      ...tseslint.configs.recommended.rules,
    },
  },

  // React config
  {
    files: ["**/*.{jsx,tsx}"],
    plugins: {
      react: pluginReact,
    },
    settings: {
      react: {
        version: "detect", // Automatically detect react version
      },
    },
    extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:prettier/recommended",
    ],
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
    },
  },

  // Prettier config
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    plugins: {
      prettier, // Make sure prettier plugin is declared here
    },
    extends: ["plugin:prettier/recommended", "prettier"],
    rules: {
      "prettier/prettier": "error", // Enforce Prettier formatting as error
      ...eslintConfigPrettier.rules,
    },
  },
]);
