module.exports = {
  'svelte/infinite-reactive-loop': 2,
  'svelte/no-dom-manipulating': 2,
  'svelte/no-dupe-else-if-blocks': 2,
  'svelte/no-dupe-on-directives': 2,
  'svelte/no-dupe-style-properties': 2,
  'svelte/no-dupe-use-directives': 2,
  'svelte/no-dynamic-slot-name': 2,
  'svelte/no-export-load-in-svelte-module-in-kit-pages': 2,
  'svelte/no-not-function-handler': 2,
  'svelte/no-object-in-text-mustaches': 2,
  'svelte/no-reactive-reassign': 2,
  'svelte/no-shorthand-style-property-overrides': 2,
  'svelte/no-store-async': 2,
  'svelte/no-unknown-style-directive-property': 2,
  'svelte/require-store-callbacks-use-set-param': 2,
  'svelte/require-store-reactive-access': 2,
  'svelte/valid-compile': 2,
  'svelte/valid-prop-names-in-kit-pages': 2,

  // Security
  'svelte/no-at-html-tags': 2,
  'svelte/no-target-blank': 2,

  // Best practices
  'svelte/block-lang': [
    2,
    {
      enforceScriptPresent: false,
      enforceStylePresent: false,
      script: [ 'ts', null ],
      style: [ 'scss', null ]
    }
  ],

  'svelte/button-has-type': 2,
  'svelte/no-at-debug-tags': 2,
  'svelte/no-immutable-reactive-statements': 2,
  'svelte/no-reactive-functions': 2,
  'svelte/no-reactive-literals': 2,
  'svelte/no-unused-class-name': 0,
  'svelte/no-unused-svelte-ignore': 2,
  'svelte/no-useless-mustaches': 2,
  'svelte/prefer-destructured-store-props': 2,
  'svelte/require-each-key': 2,
  'svelte/require-event-dispatcher-types': 2,
  'svelte/require-optimized-style-attribute': 2,
  'svelte/require-stores-init': 2,
  'svelte/valid-each-key': 2,

  // Stylistic
  'svelte/derived-has-same-inputs-outputs': 2,
  'svelte/first-attribute-linebreak': [
    2,
    {
      multiline: 'below',
      singleline: 'beside'
    }
  ],
  'svelte/html-closing-bracket-spacing': [
    2,
    {
      startTag: 'never',
      endTag: 'never',
      selfClosingTag: 'always'
    }
  ],
  'svelte/html-quotes': [
    2,
    {
      prefer: 'double',
      dynamic: {
        quoted: false,
        avoidInvalidUnquotedInHTML: false
      }
    }
  ],
  'svelte/html-self-closing': [
    2,
    {
      void: 'always',
      normal: 'always',
      component: 'always',
      svelte: 'always'
    }
  ],
  'svelte/indent': [
    2,
    {
      indent: 2,
      ignoredNodes: [
        'ConditionalExpression'
      ]
    }
  ],
  'svelte/max-attributes-per-line': [
    2,
    {
      multiline: 1,
      singleline: 1
    }
  ],
  'svelte/mustache-spacing': [
    2,
    {
      textExpressions: 'never', // or "always"
      attributesAndProps: 'always', // or "always"
      directiveExpressions: 'always', // or "always"
      tags: {
        openingBrace: 'never', // or "always"
        closingBrace: 'never' // or "always" or "always-after-expression"
      }
    }
  ],

  'svelte/no-extra-reactive-curlies': 2,

  'svelte/no-restricted-html-elements': [
    2,
    {
      elements: [ 'marquee' ],
      message: 'Do not use deprecated HTML tags'
    }
  ],
  'svelte/no-spaces-around-equal-signs-in-attribute': 2,
  'svelte/prefer-class-directive': 2,
  'svelte/prefer-style-directive': 2,
  'svelte/shorthand-attribute': 2,
  'svelte/shorthand-directive': 2,
  'svelte/sort-attributes': [
    2,
    {
      order: [
        'id',
        'class',
        '/^class:/u',
        'value',
        'src',
        '/^data-/u',
        'style',
        '/^style:/u',
        '/^on:/u',
        '/^use:/u',
        '/^animate:/u',
        '/^transition:/u',
        '/^in:/u',
        '/^out:/u',
        'bind:this',
        [ '/^bind:/u', '!bind:this' ],
        {
          match: [ '!/:/u', '!/^(?:id|class|value|src|style)$/u', '!/^data-/u' ],
          sort: 'alphabetical'
        }
      ]
    }
  ],
  'svelte/spaced-html-comment': [ 2, 'always' ],

  // Extension

  'svelte/no-inner-declarations': [ 2, 'functions' ],
  'svelte/no-trailing-spaces': [
    2,
    {
      skipBlankLines: false,
      ignoreComments: false
    }
  ],

  // Experimental

  'svelte/experimental-require-slot-types': 2,
  'svelte/experimental-require-strict-events': 2,

  // System

  'svelte/comment-directive': [
    2,
    {
      reportUnusedDisableDirectives: true
    }
  ],

  'svelte/system': 2,

  'svelte/no-ignored-unsubscribe': 2
}
