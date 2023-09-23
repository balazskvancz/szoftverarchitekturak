const { setRule } = require('../utils/setRule')

const { cloneRule } = require('../utils/cloneRule')

const indent = cloneRule('indent')
indent[2].ignoredNodes.push('TSTypeParameterInstantiation')

module.exports = {
  '@typescript-eslint/indent': indent,
  '@typescript-eslint/adjacent-overload-signatures': 2,
  '@typescript-eslint/array-type': [
    1,
    {
      default: 'array',
      readonly: 'array'
    }
  ],
  '@typescript-eslint/sort-type-constituents': [
    1,
    {
      checkIntersections: true,
      checkUnions: false,
      groupOrder: [
        'named',
        'keyword',
        'operator',
        'literal',
        'function',
        'import',
        'conditional',
        'object',
        'tuple',
        'intersection',
        'union',
        'nullish'
      ]
    }
  ],
  '@typescript-eslint/await-thenable': 2,
  '@typescript-eslint/ban-ts-comment': [
    1,
    {
      minimumDescriptionLength: 3,
      'ts-expect-error':        'allow-with-description',
      'ts-ignore':              false,
      'ts-nocheck':             false,
      'ts-check':               false
    }
  ],
  '@typescript-eslint/ban-types': [
    2,
    {
      extendDefaults: true,
      types: {
        Object: false
      }
    }
  ],
  '@typescript-eslint/class-literal-property-style': 0,
  '@typescript-eslint/consistent-type-assertions': 2,
  '@typescript-eslint/consistent-type-definitions': [ 0, 'interface' ],
  '@typescript-eslint/explicit-function-return-type': [
    1,
    {
      allowConciseArrowFunctionExpressionsStartingWithVoid: false,
      allowDirectConstAssertionInArrowFunctions:            false,
      allowFunctionsWithoutTypeParameters:                  false,
      allowTypedFunctionExpressions:                        true,
      allowHigherOrderFunctions:                            false,
      allowExpressions:                                     true
    }
  ],
  '@typescript-eslint/explicit-member-accessibility': [
    1,
    {
      accessibility: 'explicit',
      overrides: {
        parameterProperties: 'off',
        constructors:        'explicit',
        properties:          'explicit',
        accessors:           'explicit',
        methods:             'explicit'
      }
    }
  ],
  '@typescript-eslint/explicit-module-boundary-types': [
    1,
    {
      allowDirectConstAssertionInArrowFunctions: true,
      allowArgumentsExplicitlyTypedAsAny:        true,
      allowTypedFunctionExpressions:             true,
      allowHigherOrderFunctions:                 true,
      allowedNames:                              []
    }
  ],
  '@typescript-eslint/member-delimiter-style': [
    1,
    {
      singleline: {
        delimiter: 'comma',
        requireLast: false
      },
      multiline: {
        delimiter: 'none',
        requireLast: false
      }
    }
  ],
  '@typescript-eslint/member-ordering': [
    1,
    {
      classes: [
        'signature',
        'call-signature',
        'public-static-field',
        'protected-static-field',
        'private-static-field',
        '#private-static-field',
        'public-decorated-field',
        'protected-decorated-field',
        'private-decorated-field',
        'public-instance-field',
        'protected-instance-field',
        'private-instance-field',
        '#private-instance-field',
        'public-abstract-field',
        'protected-abstract-field',
        'public-field',
        'protected-field',
        'private-field',
        '#private-field',
        'static-field',
        'instance-field',
        'abstract-field',
        'decorated-field',
        'field',
        'static-initialization',
        [ 'public-static-get', 'public-static-set' ],
        [ 'protected-static-get', 'protected-static-set' ],
        [ 'private-static-get', 'private-static-set' ],
        [ '#private-static-get', '#private-static-set' ],
        [ 'public-decorated-get', 'public-decorated-set' ],
        [ 'protected-decorated-get', 'protected-decorated-set' ],
        [ 'private-decorated-get', 'private-decorated-set' ],
        [ 'public-instance-get', 'public-instance-set' ],
        [ 'protected-instance-get', 'protected-instance-set' ],
        [ 'private-instance-get', 'private-instance-set' ],
        [ '#private-instance-get', '#private-instance-set' ],
        [ 'public-abstract-get', 'public-abstract-set' ],
        [ 'protected-abstract-get', 'protected-abstract-set' ],
        [ 'public-get', 'public-set' ],
        [ 'protected-get', 'protected-set' ],
        [ 'private-get', 'private-set' ],
        [ '#private-get', '#private-set' ],
        [ 'static-get', 'static-set' ],
        [ 'instance-get', 'instance-set' ],
        [ 'abstract-get', 'abstract-set' ],
        [ 'decorated-get', 'decorated-set' ],
        [ 'get', 'set' ],
        'public-constructor',
        'protected-constructor',
        'private-constructor',
        'constructor',
        'public-static-method',
        'protected-static-method',
        'private-static-method',
        '#private-static-method',
        'public-decorated-method',
        'protected-decorated-method',
        'private-decorated-method',
        'public-instance-method',
        'protected-instance-method',
        'private-instance-method',
        '#private-instance-method',
        'public-abstract-method',
        'protected-abstract-method',
        'public-method',
        'protected-method',
        'private-method',
        '#private-method',
        'static-method',
        'instance-method',
        'abstract-method',
        'decorated-method',
        'method'
      ],
      interfaces: [
        'signature',
        'field',
        'method',
        'constructor'
      ],
      typeLiterals: [
        'signature',
        'field',
        'method',
        'constructor'
      ]
    }
  ],
  '@typescript-eslint/method-signature-style': [ 1, 'property' ],
  '@typescript-eslint/no-dynamic-delete': 2,
  '@typescript-eslint/no-empty-interface': [
    2,
    {
      allowSingleExtends: true
    }
  ],
  '@typescript-eslint/no-explicit-any': 1,
  '@typescript-eslint/no-extra-non-null-assertion': 1,
  '@typescript-eslint/no-extraneous-class': [
    1,
    {
      allowConstructorOnly: false,
      allowWithDecorator:   false,
      allowStaticOnly:      true,
      allowEmpty:           true
    }
  ],
  '@typescript-eslint/no-floating-promises': 0,
  '@typescript-eslint/no-for-in-array': 0,
  '@typescript-eslint/no-implied-eval': setRule('no-implied-eval'),
  '@typescript-eslint/no-inferrable-types': [
    1,
    {
      ignoreParameters: false,
      ignoreProperties: false
    }
  ],
  '@typescript-eslint/no-invalid-void-type': 0,
  '@typescript-eslint/no-misused-new': 2,
  '@typescript-eslint/no-misused-promises': [
    2,
    {
      checksConditionals: true,
      checksSpreads: true,
      checksVoidReturn: {
        arguments: false,
        attributes: false,
        properties: false,
        variables: true,
        returns: true
      }
    }
  ],
  '@typescript-eslint/no-namespace': 2,
  '@typescript-eslint/no-non-null-asserted-optional-chain': 1,
  '@typescript-eslint/no-non-null-assertion': 1,
  '@typescript-eslint/no-require-imports': 0,
  '@typescript-eslint/no-this-alias': [
    2,
    {
      allowDestructuring: true,
      allowedNames: []
    }
  ],
  '@typescript-eslint/no-throw-literal': 2,
  '@typescript-eslint/no-type-alias': 0,
  '@typescript-eslint/no-unnecessary-boolean-literal-compare': 1,
  '@typescript-eslint/no-unnecessary-condition': [ 0, { allowConstantLoopConditions: false } ],
  '@typescript-eslint/no-unnecessary-qualifier': 2,
  '@typescript-eslint/no-unnecessary-type-arguments': 1,
  '@typescript-eslint/no-unnecessary-type-assertion': 1,
  '@typescript-eslint/no-unsafe-assignment': 0,
  '@typescript-eslint/no-unsafe-call': 1,
  '@typescript-eslint/no-unsafe-member-access': 1,
  '@typescript-eslint/no-unsafe-return': 0,
  '@typescript-eslint/no-unsafe-argument': 0,
  '@typescript-eslint/no-var-requires': 0,
  '@typescript-eslint/prefer-as-const': 1,
  '@typescript-eslint/prefer-for-of': 1,
  '@typescript-eslint/prefer-function-type': 1,
  '@typescript-eslint/prefer-includes': 1,
  '@typescript-eslint/prefer-namespace-keyword': 2,
  '@typescript-eslint/prefer-nullish-coalescing': [
    1,
    {
      ignoreMixedLogicalExpressions: true,
      ignoreConditionalTests:        true
    }
  ],
  '@typescript-eslint/prefer-optional-chain': 1,
  '@typescript-eslint/prefer-readonly': [ 1, { onlyInlineLambdas: false } ],
  '@typescript-eslint/prefer-readonly-parameter-types': [
    0,
    {
      checkParameterProperties: true,
      ignoreInferredTypes: true,
      treatMethodsAsReadonly: true
    }
  ],

  '@typescript-eslint/prefer-reduce-type-parameter': 0,
  '@typescript-eslint/prefer-regexp-exec': 1,
  '@typescript-eslint/prefer-string-starts-ends-with': 1,
  '@typescript-eslint/prefer-ts-expect-error': 1,
  '@typescript-eslint/promise-function-async': 0,
  '@typescript-eslint/require-array-sort-compare': 1,
  '@typescript-eslint/restrict-plus-operands': 1,
  '@typescript-eslint/restrict-template-expressions': [
    1,
    {
      allowBoolean: true,
      allowNullish: true,
      allowNumber:  true,
      allowAny:     true,
      allowRegExp:  false
    }
  ],
  '@typescript-eslint/strict-boolean-expressions': [
    0,
    {
      allowAny: true,
      allowNullableBoolean: true,
      allowNullableEnum: false,
      allowNullableNumber: false,
      allowNullableString: false,
      allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: false,
      allowNullableObject: true,
      allowNumber: false,
      allowString: false
    }
  ],
  '@typescript-eslint/switch-exhaustiveness-check': 0,
  '@typescript-eslint/triple-slash-reference': 2,
  '@typescript-eslint/type-annotation-spacing': [
    1,
    {
      before: false,
      after: true,
      overrides: {
        arrow: {
          before: true, after: true
        }
      }
    }
  ],

  '@typescript-eslint/typedef': 0,
  '@typescript-eslint/unbound-method': [ 2, { ignoreStatic: true } ],
  '@typescript-eslint/unified-signatures': 1,
  '@typescript-eslint/brace-style': setRule('brace-style'),
  '@typescript-eslint/comma-spacing': setRule('comma-spacing'),
  '@typescript-eslint/default-param-last': 2,
  '@typescript-eslint/dot-notation': setRule('dot-notation', {
    allowPrivateClassPropertyAccess: false,
    allowProtectedClassPropertyAccess: false
  }),
  '@typescript-eslint/func-call-spacing': setRule('func-call-spacing'),
  '@typescript-eslint/init-declarations': 0,
  '@typescript-eslint/keyword-spacing': setRule('keyword-spacing'),
  '@typescript-eslint/lines-between-class-members': setRule('lines-between-class-members'),
  '@typescript-eslint/no-array-constructor': 2,
  '@typescript-eslint/no-dupe-class-members': 2,
  '@typescript-eslint/no-empty-function': setRule('no-empty-function'),
  '@typescript-eslint/no-extra-parens': 0,
  '@typescript-eslint/no-extra-semi': 2,
  '@typescript-eslint/no-invalid-this': setRule('no-invalid-this'),
  '@typescript-eslint/no-magic-numbers': [ 1, {
    ignore: [ 0, 1, -1 ],
    ignoreDefaultValues: true,
    ignoreArrayIndexes:  true,
    detectObjects:       false,
    enforceConst:        false,
    ignoreReadonlyClassProperties: true,
    ignoreNumericLiteralTypes:     true,
    ignoreTypeIndexes:             true,
    ignoreEnums:                   true
  } ],

  '@typescript-eslint/no-unused-expressions': setRule('no-unused-expressions'),
  '@typescript-eslint/no-unused-vars': setRule('no-unused-vars'),
  '@typescript-eslint/no-use-before-define': setRule('no-use-before-define', {
    ignoreTypeReferences: false,
    typedefs:             true,
    enums:                true
  }),
  '@typescript-eslint/no-useless-constructor': 2,
  '@typescript-eslint/quotes': setRule('quotes'),
  '@typescript-eslint/require-await': setRule('require-await'),
  '@typescript-eslint/return-await': 2,
  '@typescript-eslint/semi': setRule('semi'),
  '@typescript-eslint/space-before-function-paren': setRule('space-before-function-paren'),
  '@typescript-eslint/prefer-enum-initializers': 1,
  '@typescript-eslint/ban-tslint-comment': 1,
  '@typescript-eslint/no-loss-of-precision': 1,
  '@typescript-eslint/no-confusing-non-null-assertion': 1,
  '@typescript-eslint/prefer-literal-enum-member': 1,
  '@typescript-eslint/no-redeclare': setRule('no-redeclare', {
    ignoreDeclarationMerge: true
  }),
  '@typescript-eslint/no-loop-func': 2,
  '@typescript-eslint/comma-dangle': setRule('comma-dangle', {
    generics: 'never',
    tuples:   'never',
    enums:    'never'
  }),
  '@typescript-eslint/consistent-generic-constructors': [ 1, 'constructor' ],
  '@typescript-eslint/consistent-indexed-object-style': 0,
  '@typescript-eslint/space-infix-ops': setRule('space-infix-ops'),
  '@typescript-eslint/no-unnecessary-type-constraint': 1,
  '@typescript-eslint/no-confusing-void-expression': [
    1,
    {
      ignoreVoidOperator: false,
      ignoreArrowShorthand: true
    }
  ],

  '@typescript-eslint/non-nullable-type-assertion-style': 0,
  '@typescript-eslint/object-curly-spacing': setRule('object-curly-spacing'),
  '@typescript-eslint/no-shadow': [
    0,
    {
      builtinGlobals: true,
      hoist: 'functions',
      ignoreTypeValueShadow: false,
      ignoreFunctionTypeParameterNameValueShadow: false
    }
  ],
  '@typescript-eslint/consistent-type-imports': [ 1, { prefer: 'type-imports', disallowTypeAnnotations: true } ],
  '@typescript-eslint/prefer-return-this-type': 1,
  '@typescript-eslint/no-meaningless-void-operator': [ 1, { checkNever: false } ],
  '@typescript-eslint/padding-line-between-statements': setRule(
    'padding-line-between-statements',
    { blankLine: 'always', prev: '*', next: [ 'interface' ] }
  ),
  '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 1,
  '@typescript-eslint/no-restricted-imports': 0,
  '@typescript-eslint/consistent-type-exports': 2,
  '@typescript-eslint/no-redundant-type-constituents': 1,
  '@typescript-eslint/no-useless-empty-export': 2,
  '@typescript-eslint/space-before-blocks': setRule('space-before-blocks'),
  '@typescript-eslint/no-duplicate-enum-values': 0,
  '@typescript-eslint/no-unsafe-declaration-merging': 2,
  '@typescript-eslint/parameter-properties': 0,
  '@typescript-eslint/key-spacing': setRule('key-spacing'),
  '@typescript-eslint/block-spacing': setRule('block-spacing'),
  '@typescript-eslint/no-import-type-side-effects': 2,
  '@typescript-eslint/no-mixed-enums': 2,
  '@typescript-eslint/lines-around-comment': 0,
  '@typescript-eslint/no-duplicate-type-constituents': [ 1, { ignoreIntersections: false, ignoreUnions: false } ],
  '@typescript-eslint/no-unsafe-enum-comparison': 0,
  '@typescript-eslint/class-methods-use-this': 0
}
