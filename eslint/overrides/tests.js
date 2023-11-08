module.exports = [
  {
    files: [ '*.test.*' ],
    rules: {
      ...require('../rules/jest.json'),

      'no-restricted-globals': 0,
      'newline-per-chained-call': [
        1,
        {
          ignoreChainWithDepth: 2
        }
      ],

      'import/first': 0,

      'no-restricted-syntax': 0,
      'max-len': 0,
      'no-console': 1,
      'max-lines': 0,
      'max-params': 0,
      'max-lines-per-function': 0,
      'max-nested-callbacks': 0,
      'class-methods-use-this': 0,

      '@typescript-eslint/no-extraneous-class': 0,
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/naming-convention': 0,

      '@typescript-eslint/no-magic-numbers': 0,
      '@typescript-eslint/no-unsafe-assignment': 0,
      '@typescript-eslint/no-unsafe-call': 0,
      '@typescript-eslint/no-unsafe-member-access': 0,
      '@typescript-eslint/no-unsafe-return': 0,
      '@typescript-eslint/no-unsafe-argument': 0
    }
  }
]
