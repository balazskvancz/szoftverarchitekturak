const path = require('path')

module.exports = [
  // Sima TypeScript és TSX fájlok esetén, akár teszt, akár nem.
  {
    files: [ '*.ts', '*.tsx' ],

    env: {
      browser: true
    },

    parser: '@typescript-eslint/parser',

    parserOptions: {
      ecmaVersion: 2020,

      ecmaFeatures: {
        jsx: true
      },
      useJSXTextNode: true,
      project: true, // path.resolve(__dirname, '..', '..', 'tsconfig.json'),
      tsconfigRootDir: path.resolve(__dirname, '..', '..'),
      sourceType: 'module',
      extraFileExtensions: [ '.svelte' ]
    },

    rules: {
      ...require('../rules/typescript')
    }
  }
]
