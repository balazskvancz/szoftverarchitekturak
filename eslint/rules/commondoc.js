// ---------- JSDOC ---------
// https://github.com/gajus/eslint-plugin-jsdoc
// -----------------------------

// 0 - disabled
// 1 - warning
// 2 - error

// A TSDoc-hoz a JSDoc-ból használható, közös szabályok.

module.exports = {
  'jsdoc/check-alignment': 1,
  'jsdoc/check-indentation': 1,
  'jsdoc/no-bad-blocks': 1,
  'jsdoc/no-multi-asterisks': [ 1, { preventAtEnd: false, preventAtMiddleLines: false } ],
  'jsdoc/require-asterisk-prefix': [ 1, 'always' ],
  'jsdoc/require-description': 1,
  'jsdoc/require-description-complete-sentence': 1,
  'jsdoc/require-param': [ 1, {
    enableRestElementFixer: true,
    checkRestProperty: false,
    checkDestructured: true,
    enableFixer: true
  } ],
  'jsdoc/require-hyphen-before-param-description': [ 1, 'always', { tags: { returns: 'never' } } ],
  'jsdoc/empty-tags': 1,
  'jsdoc/multiline-blocks': [ 1, {
    noZeroLineText: true,
    noFinalLineText: true,
    noSingleLineBlocks: false,
    singleLineTags: [ 'lends', 'type' ],
    noMultilineBlocks: true,
    minimumLengthForMultiline: 100,
    multilineTags: [ '*' ],
    allowMultipleTags: true
  } ],
  'jsdoc/require-param-description': 1,
  'jsdoc/require-param-name': 1,
  'jsdoc/require-returns-description': 0,
  'jsdoc/require-jsdoc': 0,
  'jsdoc/no-blank-block-descriptions': 1,
  'jsdoc/no-blank-blocks': 1,
  'jsdoc/imports-as-dependencies': 0
}
