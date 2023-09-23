module.exports = {
  eslintIntegration: true,
  semi: false,
  trailingComma: 'none',
  singleQuote: true,
  printWidth: 120,
  tabWidth: 2,
  quoteProps: 'as-needed',
  bracketSpacing: true,
  arrowParens: 'always',
  plugins: [
    // 'prettier-plugin-svelte' // TODO: ha majd lesz Svelte.
  ],
  pluginSearchDirs: false,
  overrides: [
    // TODO: same as l 12.
    // {
      // files: '*.svelte',
      // options: {
        // svelteSortOrder: 'options-scripts-styles-markup',
        // svelteStrictMode: true,
        // svelteAllowShorthand: true,
        // // svelteBracketNewLine: true, // DEPRECATED
        // svelteIndentScriptAndStyle: true
      // }
    // }
  ]
}
