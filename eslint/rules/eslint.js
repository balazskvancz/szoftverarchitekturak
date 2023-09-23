// ---------- Standard ---------
// https://eslint.org/docs/rules
// -----------------------------
//
// Airbnb:   https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base/rules
// Standard: https://github.com/standard/eslint-config-standard/blob/master/eslintrc.json
//
// 0 - disabled
// 1 - warning
// 2 - error

const {
  NO_RESTRICTED_SYNTAX_SELECTORS,
  NO_RESTRICTED_PROPERTIES
} = require('../consts')

module.exports = {
  'constructor-super': 2,
  'for-direction': 2,
  'getter-return': 2,
  'no-async-promise-executor': 2,
  'no-await-in-loop': 0,
  'no-case-declarations': 2,
  'no-class-assign': 2,
  'no-compare-neg-zero': 2,
  'no-cond-assign': 2,
  'no-const-assign': 2,
  'no-constant-condition': [ 2, { checkLoops: true } ],
  'no-control-regex': 1,
  'no-debugger': 2,
  'no-delete-var': 2,
  'no-dupe-args': 2,
  'no-dupe-class-members': 2,
  'no-dupe-else-if': 2,
  'no-dupe-keys': 2,
  'no-duplicate-case': 2,
  'no-empty': [ 2, { allowEmptyCatch: false } ],
  'no-empty-character-class': 2,
  'no-empty-pattern': 2,
  'no-ex-assign': 2,
  'no-extra-boolean-cast': 2,
  'no-extra-semi': 2,
  'no-fallthrough': 2,
  'no-func-assign': 2,
  'no-global-assign': 2,
  'no-import-assign': 2,
  'no-inner-declarations': 1,
  'no-invalid-regexp': 2,
  'no-irregular-whitespace': 2,
  'no-loss-of-precision': 2,
  'no-misleading-character-class': 2,
  'no-mixed-spaces-and-tabs': 2,
  'no-new-symbol': 2,
  'no-obj-calls': 2,
  'no-octal': 2,
  'no-prototype-builtins': 2,
  'no-redeclare': [ 2, { builtinGlobals: false } ],
  'no-regex-spaces': 2,
  'no-self-assign': 2,
  'no-setter-return': 2,
  'no-shadow-restricted-names': 2,
  'no-sparse-arrays': 2,
  'no-this-before-super': 2,
  'no-undef': [ 2, { typeof: true } ],
  'no-unexpected-multiline': 2,
  'no-unreachable': 2,
  'no-unsafe-finally': 2,
  'no-unsafe-negation': 2,
  'no-unused-labels': 2,
  'no-labels': [ 2, { allowLoop: false, allowSwitch: false } ],
  'no-extra-label': 2,
  'no-useless-catch': 2,
  'no-useless-escape': 2,
  'no-with': 0,
  'require-yield': 2,
  'use-isnan': 2,
  'valid-typeof': [ 2, { requireStringLiterals: true } ],
  'template-curly-spacing': [ 1, 'always' ],
  'no-multiple-empty-lines': [
    1,
    {
      max: 1,
      maxEOF: 0,
      maxBOF: 0
    }
  ],
  indent: [
    1,
    2,
    {
      SwitchCase: 1,
      VariableDeclarator: 1,
      outerIIFEBody: 0,
      MemberExpression: 1,
      FunctionDeclaration: {
        parameters: 1,
        body: 1
      },
      FunctionExpression: {
        parameters: 1,
        body: 1
      },
      CallExpression: {
        arguments: 1
      },
      ArrayExpression: 'first',
      ObjectExpression: 1,
      ImportDeclaration: 1,
      flatTernaryExpressions: false,
      offsetTernaryExpressions: false,
      ignoredNodes: [],
      ignoreComments: true
    }
  ],
  'key-spacing': [
    1,
    {
      beforeColon: false,
      afterColon: true,
      mode: 'minimum'
    }
  ],
  'comma-dangle': [
    1,
    {
      arrays:    'never',
      objects:   'never',
      imports:   'never',
      exports:   'never',
      functions: 'never'
    }
  ],
  'brace-style': [ 1, 'stroustrup', { allowSingleLine: false } ],
  'no-unused-vars': [
    2,
    {
      vars: 'all',
      args: 'all',
      ignoreRestSiblings: false,
      varsIgnorePattern: '^_',
      argsIgnorePattern: '^_'
    }
  ],
  'class-methods-use-this': [
    0,
    {
      exceptMethods: []
    }
  ],
  'no-floating-decimal': 0,
  'no-var': 2,
  'array-bracket-spacing': [ 1, 'always' ],
  'lines-between-class-members': [
    1,
    'always',
    {
      exceptAfterSingleLine: true
    }
  ],
  curly: [ 1, 'all' ],
  'space-before-function-paren': [
    1,
    {
      anonymous: 'always',
      named: 'always',
      asyncArrow: 'always'
    }
  ],
  'space-before-blocks': [ 1, 'always' ],
  'padded-blocks': [ 1, { blocks: 'never', switches: 'never', classes: 'never' } ],
  'spaced-comment': [ 1, 'always' ],
  'padding-line-between-statements': [
    1,
    { blankLine: 'always', prev: 'block-like', next: '*' },
    { blankLine: 'always', prev: '*', next: 'block-like' },
    { blankLine: 'always', prev: 'break', next: '*' },
    { blankLine: 'always', prev: '*', next: 'class' },
    { blankLine: 'always', prev: 'class', next: '*' },
    { blankLine: 'always', prev: '*', next: 'try' },
    { blankLine: 'always', prev: 'try', next: '*' },
    { blankLine: 'always', prev: '*', next: 'throw' },
    { blankLine: 'always', prev: 'throw', next: '*' },
    { blankLine: 'always', prev: '*', next: 'directive' },
    { blankLine: 'always', prev: 'continue', next: '*' },
    { blankLine: 'always', prev: 'function', next: '*' },
    { blankLine: 'always', prev: 'if', next: '*' },
    { blankLine: 'always', prev: 'for', next: '*' },
    { blankLine: 'always', prev: '*', next: 'return' },
    { blankLine: 'always', prev: '*', next: 'multiline-const' },
    { blankLine: 'always', prev: 'multiline-const', next: '*' },
    { blankLine: 'always', prev: '*', next: 'multiline-expression' },
    { blankLine: 'always', prev: 'multiline-expression', next: '*' },
    { blankLine: 'always', prev: '*', next: 'multiline-block-like' },
    { blankLine: 'always', prev: 'multiline-block-like', next: '*' }
  ],
  'accessor-pairs': 0,
  'grouped-accessor-pairs': 1,
  'no-console': 2,
  'no-extra-parens': 0,
  'no-template-curly-in-string': 2,
  'no-useless-backreference': 2,
  'require-atomic-updates': 2,
  'array-callback-return': [ 2, { allowImplicit: true } ], // Unicorn: no-useless-undefined ajánlás
  'block-scoped-var': 2,
  'no-multi-spaces': [
    0,
    {
      ignoreEOLComments: false,
      exceptions: {
        Property:           true,
        BinaryExpression:   false,
        VariableDeclarator: true,
        ImportDeclaration:  true
      }
    }
  ],
  'no-magic-numbers': 0,
  complexity: [ 0, { max: 4 } ],
  'consistent-return': 0,
  'default-case': 0,
  'default-case-last': 0,
  'default-param-last': 2,
  'dot-notation': [ 2, { allowKeywords: true } ],
  'dot-location': [ 2, 'property' ],
  eqeqeq: [ 2, 'always' ],
  'guard-for-in': 0,
  'max-classes-per-file': [ 2, 1 ],
  'no-alert': 2,
  'no-caller': 2,
  'no-constructor-return': 2,
  'no-div-regex': 2,
  'no-else-return': [
    1,
    {
      allowElseIf: true
    }
  ],
  'no-empty-function': [ 1, { allow: [] } ],
  'no-eq-null': 2,
  'no-eval': 2,
  'no-extend-native': 2,
  'no-extra-bind': 2,
  'no-implicit-coercion': 2,
  'no-implicit-globals': 0,
  'no-implied-eval': 1,
  'no-invalid-this': [
    2,
    {
      capIsConstructor: false
    }
  ],
  'no-iterator': 2,
  'no-lone-blocks': 2,
  'no-loop-func': 2,
  'no-multi-str': 2,
  'no-new': 2,
  'no-new-func': 2,
  'no-new-wrappers': 2,
  'no-octal-escape': 2,
  'no-param-reassign': 2,
  'no-proto': 2,
  'no-restricted-properties': [ 1, ...NO_RESTRICTED_PROPERTIES ],
  'no-return-assign': 2,
  'no-return-await': 2,
  'no-script-url': 2,
  'no-self-compare': 2,
  'no-sequences': 2,
  'no-throw-literal': 2,
  'no-unmodified-loop-condition': 2,
  'no-unused-expressions': [
    2,
    {
      allowShortCircuit: false,
      allowTernary: false,
      allowTaggedTemplates: false
    }
  ],
  'no-useless-call': 2,
  'no-useless-concat': 2,
  'no-useless-return': 2,
  'no-void': 2,
  'no-warning-comments': 0,
  'prefer-named-capture-group': 0,
  'prefer-promise-reject-errors': 2,
  'prefer-regex-literals': 2,
  radix: [ 1, 'as-needed' ],
  'require-await': 2,
  'require-unicode-regexp': 0,
  'vars-on-top': 2,
  'wrap-iife': [ 2, 'inside' ],
  yoda: [ 1, 'never' ],
  strict: [ 2, 'never' ],
  'init-declarations': 0,
  'no-label-var': 2,
  'no-shadow': 1,
  'no-undef-init': 0,
  'no-undefined': 0,
  'no-use-before-define': [
    1,
    {
      functions: true,
      classes: true,
      variables: true
    }
  ],
  'array-bracket-newline': [ 1, 'consistent' ],
  'array-element-newline': 0,
  'block-spacing': [ 1, 'always' ],
  camelcase: [
    2,
    {
      properties: 'always',
      ignoreDestructuring: false,
      ignoreImports: false,
      ignoreGlobals: false
    }
  ],
  'capitalized-comments': [
    0,
    'always',
    {
      ignoreInlineComments: true,
      ignoreConsecutiveComments: true,
      ignorePattern: '@ignore'
    }
  ],
  'comma-spacing': [ 2, { before: false, after: true } ],
  'comma-style': [
    1,
    'last',
    {
      exceptions: {
        ArrayExpression: false,
        ArrayPattern: false,
        ArrowFunctionExpression: false,
        CallExpression: false,
        FunctionDeclaration: false,
        FunctionExpression: false,
        ImportDeclaration: false,
        ObjectExpression: false,
        ObjectPattern: false,
        VariableDeclaration: false,
        NewExpression: false
      }
    }
  ],
  'computed-property-spacing': [
    1,
    'never',
    {
      enforceForClassMembers: true
    }
  ],
  'consistent-this': 0,
  'eol-last': [ 2, 'always' ],
  'func-call-spacing': [ 2, 'never' ],
  'func-name-matching': [
    2,
    'always',
    {
      includeCommonJSModuleExports: false,
      considerPropertyDescriptor: true
    }
  ],
  'func-names': [ 2, 'as-needed' ],
  'func-style': [ 2, 'declaration', { allowArrowFunctions: true } ],
  'function-call-argument-newline': [ 2, 'consistent' ],
  'function-paren-newline': [ 0, 'consistent' ],
  'id-denylist': 0,
  'id-length': [ 0, { min: 3 } ],
  'id-match': 0,
  'implicit-arrow-linebreak': [ 1, 'beside' ],
  /**
   * @see {@link https://eslint.org/docs/rules/jsx-quotes}
   */
  'jsx-quotes': [ 2, 'prefer-double' ],
  'keyword-spacing': [
    2,
    {
      before: true,
      after: true
    }
  ],
  'line-comment-position': 0,
  'linebreak-style': 0,
  'lines-around-comment': 0,
  'max-depth': [ 1, { max: 4 } ],
  'max-len': [ 1, {
    code: 140,
    comments: 140,
    ignoreComments: true,
    ignoreUrls: true,
    ignorePattern: '^import .*',
    ignoreStrings: false,
    ignoreTemplateLiterals: false,
    ignoreRegExpLiterals: false
  } ],
  'max-lines': [
    1,
    {
      max: 900,
      skipBlankLines: false,
      skipComments: false
    }
  ],
  'max-lines-per-function': [
    1,
    {
      max: 300,
      skipBlankLines: false,
      skipComments: false,
      IIFEs: false
    }
  ],
  'max-nested-callbacks': [ 1, { max: 3 } ],
  'max-params': [ 1, { max: 4 } ],
  'max-statements': 0,
  'max-statements-per-line': [ 1, { max: 1 } ],
  'multiline-comment-style': 0,
  'multiline-ternary': [ 1, 'always-multiline' ],
  'new-cap': [
    1,
    {
      newIsCap: true,
      capIsNew: false,
      newIsCapExceptions: [],
      properties: true
    }
  ],
  'new-parens': [ 2, 'always' ],
  'newline-per-chained-call': [
    1,
    {
      ignoreChainWithDepth: 3
    }
  ],
  'no-array-constructor': 2,
  'no-bitwise': 0,
  'no-continue': 2,
  'no-inline-comments': 0,
  'no-lonely-if': 0,

  /**
   * @see {@link https://eslint.org/docs/latest/rules/no-mixed-operators}
   */
  'no-mixed-operators': [
    1,
    {
      allowSamePrecedence: true
    }
  ],
  'no-multi-assign': 2,
  'no-negated-condition': 1,
  'no-nested-ternary': 0,
  'no-new-object': 2,
  'no-plusplus': 0,
  // https://eslint.org/docs/rules/no-restricted-syntax
  'no-restricted-syntax': [
    1,
    NO_RESTRICTED_SYNTAX_SELECTORS.with,
    NO_RESTRICTED_SYNTAX_SELECTORS.switch,
    NO_RESTRICTED_SYNTAX_SELECTORS.isArray,
    NO_RESTRICTED_SYNTAX_SELECTORS.classMethodStaticArrowDeclaration,
    NO_RESTRICTED_SYNTAX_SELECTORS.classMethodImplicitReturn,
    NO_RESTRICTED_SYNTAX_SELECTORS.classMethodPublicArrowDeclaration,
    NO_RESTRICTED_SYNTAX_SELECTORS.variableArrowDeclaration,
    NO_RESTRICTED_SYNTAX_SELECTORS.noUnnamedTuple,
    NO_RESTRICTED_SYNTAX_SELECTORS.logicalAndAssignmentOperator,
    NO_RESTRICTED_SYNTAX_SELECTORS.logicalOrAssignmentOperator,
    NO_RESTRICTED_SYNTAX_SELECTORS.nullishCoalescingAssignmentOperator,
    NO_RESTRICTED_SYNTAX_SELECTORS.bigInt,
    NO_RESTRICTED_SYNTAX_SELECTORS.typeof,
    NO_RESTRICTED_SYNTAX_SELECTORS.noBinaryExpressionNull,
    NO_RESTRICTED_SYNTAX_SELECTORS.noBinaryExpressionUndefined,
    NO_RESTRICTED_SYNTAX_SELECTORS.functionDeclarationThisVoid,
    NO_RESTRICTED_SYNTAX_SELECTORS.classPropertyDefinite,
    NO_RESTRICTED_SYNTAX_SELECTORS.publicGetHTMLElement,
    NO_RESTRICTED_SYNTAX_SELECTORS.publicGetHTMLElementList,
    NO_RESTRICTED_SYNTAX_SELECTORS.logicalBinaryAndObjectExpression,
    NO_RESTRICTED_SYNTAX_SELECTORS.logicalUnaryAndObjectExpression,
    NO_RESTRICTED_SYNTAX_SELECTORS.logicalLogicalAndObjectExpression,
    NO_RESTRICTED_SYNTAX_SELECTORS.logicalMemberAndObjectExpression,
    NO_RESTRICTED_SYNTAX_SELECTORS.logicalIdentifierAndObjectExpression,
    NO_RESTRICTED_SYNTAX_SELECTORS.noQuerySelectorAllFind,
    NO_RESTRICTED_SYNTAX_SELECTORS.callExpressionAtIdentifier,
    NO_RESTRICTED_SYNTAX_SELECTORS.classDeclarationMethodDefinitionFunctionDeclaration
  ],
  'no-tabs': 2,
  'no-ternary': 0,
  'no-trailing-spaces': [
    2,
    {
      skipBlankLines: false,
      ignoreComments: false
    }
  ],
  'no-underscore-dangle': 2,
  'no-unneeded-ternary': 1,
  'no-whitespace-before-property': 1,
  'nonblock-statement-body-position': 0,
  /**
   * @see {@link https://eslint.org/docs/latest/rules/object-curly-newline#rule-details}
   */
  'object-curly-newline': 0,

  'object-curly-spacing': [
    1,
    'always',
    {
      arraysInObjects: true,
      objectsInObjects: true
    }
  ],
  'object-property-newline': 0,
  'one-var': [ 2, 'never' ],
  'one-var-declaration-per-line': 0,
  'operator-assignment': [ 1, 'never' ],
  'operator-linebreak': [
    1,
    'after',
    {
      overrides: {
        '?': 'before',
        ':': 'before'
      }
    }
  ],
  'prefer-exponentiation-operator': 1,
  'prefer-object-spread': 1,
  'quote-props': [ 1, 'as-needed' ],
  quotes: [
    1,
    'single',
    {
      avoidEscape: true,
      allowTemplateLiterals: false
    }
  ],
  semi: [ 2, 'never' ],
  'semi-spacing': 0,
  'semi-style': 0,
  'sort-keys': 0,
  'sort-vars': 0,
  'space-in-parens': [ 1, 'never' ],
  'space-infix-ops': [ 2, { int32Hint: false } ],
  'space-unary-ops': [ 1, { words: true, nonwords: false } ],
  'switch-colon-spacing': 0,
  'template-tag-spacing': [ 1, 'never' ],
  'unicode-bom': [ 1, 'never' ],
  'wrap-regex': 1,
  'arrow-body-style': 0,
  'arrow-parens': [ 1, 'always' ],
  'arrow-spacing': [ 1, { before: true, after: true } ],
  'generator-star-spacing': [ 1, 'after' ],
  'no-confusing-arrow': [ 1, { allowParens: true } ],
  'no-duplicate-imports': 0,
  'no-restricted-exports': 0,
  'no-restricted-imports': 0,
  'no-useless-computed-key': 1,
  'no-useless-constructor': 2,
  'no-useless-rename': 1,
  'object-shorthand': [ 1, 'always', { avoidQuotes: true } ],
  'prefer-arrow-callback': 1,
  'prefer-const': [
    1,
    {
      ignoreReadBeforeAssign: true,
      destructuring: 'any'
    }
  ],
  'prefer-destructuring': [
    1,
    {
      VariableDeclarator: {
        array: true,
        object: true
      },
      AssignmentExpression: {
        array: true,
        object: false
      }
    },
    {
      enforceForRenamedProperties: false
    }
  ],
  'prefer-numeric-literals': 0,
  'prefer-rest-params': 1,
  'prefer-spread': 1,
  'prefer-template': 1,
  'rest-spread-spacing': [ 1, 'never' ],
  'sort-imports': 0,
  'symbol-description': 1,
  'yield-star-spacing': 0,
  'no-promise-executor-return': 2,
  'no-unreachable-loop': 1,
  'no-unsafe-optional-chaining': 1,
  'no-nonoctal-decimal-escape': 1,
  'no-unused-private-class-members': 2,
  'prefer-object-has-own': 0,
  'logical-assignment-operators': [ 0, 'never' ],
  'no-constant-binary-expression': 1
}
