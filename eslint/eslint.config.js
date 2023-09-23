// https://eslint.org/docs/user-guide/configuring/configuration-files

module.exports = {
  extends: [],

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
  ],

  env: {
    es6: true
  },

  ignorePatterns: [ '*.min.js' ],

  rules: {
    ...require('./rules/eslint'),
    ...require('./rules/promise'),
    ...require('./rules/commondoc'),
    ...require('./rules/perfectionist'),
    ...require('./rules/eslintComments')
  },

  overrides: require('./overrides/typescript')
}
