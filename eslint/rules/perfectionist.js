// ----------- Perfectionist -----------
// https://github.com/azat-io/eslint-plugin-perfectionist
// ----------------------------

module.exports = {
  'perfectionist/sort-array-includes': [
    0,
    {
      type: 'line-length',
      order: 'desc',
      'spread-last': true
    }
  ],
  'perfectionist/sort-classes': [
    0,
    {
      type: 'line-length',
      order: 'desc',
      groups: [
        'static-property',
        'private-property',
        'property',
        'constructor',
        'static-method',
        'private-method',
        'method'
      ]
    }
  ],
  'perfectionist/sort-enums': [
    0,
    {
      type: 'line-length',
      order: 'asc'
    }
  ],
  'perfectionist/sort-imports': [
    0,
    {
      type: 'natural',
      order: 'asc',
      'ignore-case': true,
      groups: [
        'type',
        [ 'builtin', 'builtin-type' ],
        'external',
        'object',
        'side-effect',
        [ 'internal', 'internal-type' ],
        [ 'index', 'index-type' ],
        [ 'parent', 'parent-type' ],
        [ 'siblings', 'sibling-type' ],
        'style'
      ],
      'newlines-between': 'always',
      'internal-pattern': [
        '@root/**',
        '@common/**'
      ],
      'read-tsconfig': true
    }
  ],
  'perfectionist/sort-interfaces': [
    0,
    {
      type: 'line-length',
      order: 'asc',
      'ignore-case': false,
      'ignore-pattern': []
    }
  ],
  'perfectionist/sort-jsx-props': [
    0,
    {
      type: 'line-length',
      order: 'desc',
      'always-on-top': [ 'id', 'name' ],
      shorthand: 'last',
      multiline: 'first',
      callback: 'ignore'
    }
  ],
  'perfectionist/sort-maps': [
    0,
    {
      type: 'line-length',
      order: 'asc',
      'ignore-case': false
    }
  ],
  'perfectionist/sort-named-exports': [
    1,
    {
      type: 'line-length',
      order: 'asc',
      'ignore-case': false
    }
  ],
  'perfectionist/sort-named-imports': [
    1,
    {
      type: 'line-length',
      order: 'asc',
      'ignore-case': false
    }
  ],
  'perfectionist/sort-object-types': [
    1,
    {
      type: 'line-length',
      order: 'asc',
      'ignore-case': false
    }
  ],
  'perfectionist/sort-objects': [
    0,
    {
      type: 'line-length',
      order: 'asc',
      'ignore-case': true,
      'always-on-top': []
    }
  ],
  'perfectionist/sort-union-types': [
    0,
    {
      type: 'line-length',
      order: 'asc',
      'ignore-case': false
    }
  ]
}
