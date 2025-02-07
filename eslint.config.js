import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";

const compat = new FlatCompat();

export default [
  js.configs.recommended,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        process: "readonly",
        __dirname: "readonly",
        console: "readonly",
      },
    },
    
    plugins: {
      "@typescript-eslint": typescriptPlugin,
    },
    rules: {
      semi: ["error", "always"],
     
      "no-unused-vars": "warn",
      "no-console": "off",
      "no-undef": "off",
    },
  },
];
