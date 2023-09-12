module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { project: './tsconfig.json' },
  plugins: ['@typescript-eslint', 'unused-imports', 'prettier'],
  root: true,
  ignorePatterns: ['*.cjs', '*.js'],
  rules: {
    '@typescript-eslint/no-floating-promises': ['error'],
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/no-unused-vars': 'error',
    'prettier/prettier': ['error'],
    eqeqeq: ['error'],
  },
};
