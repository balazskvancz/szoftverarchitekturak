/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
// https://github.com/webpack-contrib/eslint-webpack-plugin

const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = function eslintPlugin (/** @type {any} */ opts) {
  const cache = true

  const lintDirtyModulesOnly = true

  const ep = new ESLintPlugin({
    extensions: [ 'ts' ],
    exclude: 'node_modules',
    fix: false,
    formatter: 'stylish',
    cache,
    lintDirtyModulesOnly,
    threads: false,
    failOnError: true,
    failOnWarning: false
  })

  return ep
}
