module.exports = [
  {
    files: [ '*.svelte' ],
    env: {
      browser: true
    },
    parser: 'svelte-eslint-parser',
    parserOptions: {
      parser: '@typescript-eslint/parser',
      project: true,
      extraFileExtensions: [ '.svelte' ]
    },
    rules: {
      ...require('../disabled/disabledEslint'),
      'no-inner-declarations': 0,
      'no-self-assign': 0,
      ...require('../rules/svelte'),
      ...require('../rules/typescript'),

      'svelte/experimental-require-slot-types': 0
    }
  }
]
