module.exports = {
  root: true,
  env: { node: true },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
  ],
  plugins: ["ordered-imports"],
  parserOptions: { ecmaVersion: 2020 },
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "ordered-imports/ordered-imports": [
      "error",
      {
        "declaration-ordering": ["type", { secondaryOrdering: ["source", "lowercase-last"] }],
        "group-ordering": [
          { name: "parent directories", match: "^\\.\\.", order: 20 },
          { name: "current directory", match: "^\\.", order: 30 },
          { name: "third-party", match: ".*", order: 10 },
        ],
      },
    ],
  },
};
