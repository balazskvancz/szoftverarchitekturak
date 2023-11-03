// https://github.com/jantimon/html-webpack-plugin#minification
// https://github.com/terser/html-minifier-terser#options-quick-reference
module.exports = {
  html5: true,
  collapseWhitespace: true,
  minifyCSS: true,
  minifyJS: true,
  minifyURLs: false,
  removeAttributeQuotes: true,
  removeComments: true,
  removeEmptyAttributes: true,
  removeOptionalTags: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributese: true,
  useShortDoctype: true
}
