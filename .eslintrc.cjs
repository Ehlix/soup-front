module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:@reatom/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: [
    'prettier',
    '@typescript-eslint',
    'react',
    '@reatom',
    'react-refresh',
  ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
  overrides: [
    {
      files: ['**/components/ui/*.tsx'],
      rules: {
        'react/prop-types': 'off',
        'react-refresh/only-export-components': 'off',
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
