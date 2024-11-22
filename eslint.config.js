module.exports = {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
        parser: "@typescript-eslint/parser",
        parserOptions: {
            ecmaVersion: 2021,
            sourceType: "module",
            ecmaFeatures: {
                jsx: true,
            },
        },
    }, 
    plugins: {
        "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
        react: require("eslint-plugin-react"),
        "react-hooks": require("eslint-plugin-react-hooks"),
    },
    rules: {
        "no-unused-vars": "warn",
        "@typescript-eslint/no-explicit-any": "error",
        "react/react-in-jsx-scope": "off", // since react 17 no need to explicitly import React in jsx 
        "react/prop-types": "off",
        "no-console": "warn",
        "no-debugger": "warn"
    },    
    settings: {
        react: {
            version: "detect",
        },
    },
}