// https://eslint.org/docs/user-guide/configuring/configuration-files

module.exports = {
  extends: [],

  parserOptions: {
    // Required for certain syntax usages
    ecmaVersion: 2020
  },

  settings: {
    jsdoc: {
      mode: 'typescript'
    },
    'import/resolver': {
      typescript: true,
      node: true
    }
  },

  plugins: [
    'import',
    'n',
    'promise',
    '@typescript-eslint',
    'tsdoc',
    'jsdoc',
    'perfectionist',
    'svelte',
    '@typescript-eslint',
    'jest'
  ],

  parser: '@typescript-eslint/parser',

  env: {
    es6: true
  },

  ignorePatterns: [ '*.min.js' ],

  rules: {
    ...require('./rules/eslint'),
    ...require('./rules/promise'),
    ...require('./rules/commondoc'),
    ...require('./rules/perfectionist'),
    ...require('./rules/eslintComments'),
    ...require('./rules/svelte')
  },

  overrides: [
    ...require('./overrides/typescript'),
    ...require('./overrides/tests'),
    ...require('./overrides/svelte'),
  ]
}
