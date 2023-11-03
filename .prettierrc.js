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
    'prettier-plugin-svelte'
  ],
  pluginSearchDirs: false,
  overrides: [
    {
      files: '*.svelte',
      options: {
        svelteSortOrder: 'options-scripts-styles-markup',
        svelteStrictMode: true,
        svelteAllowShorthand: true,
        svelteIndentScriptAndStyle: true
      }
    }
  ]
}
