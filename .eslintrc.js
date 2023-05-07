module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "react-app",
        "react-app/jest",
        "plugin:prettier/recommended",
        "airbnb",
        "airbnb-typescript",
        "prettier",
        "prettier/prettier",
    ],
    overrides: [],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
    },
    plugins: [
        "react",
        "@typescript-eslint",
        "prettier"
    ],
    rules: {
        "no-console": ['error', { allow: ['debug', 'warn', 'error'] }],
    },
};
