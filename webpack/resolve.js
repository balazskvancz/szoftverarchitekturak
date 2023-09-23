/* eslint-disable no-undef */
require('module-alias/register')

const { webpackPaths } = require('@root/paths')

module.exports = function resolve () {
  return {
    descriptionFiles: [ 'package.json' ],
    extensions: [ '.ts', '.js', '.svelte' ],
    modules: [ 'node_modules' ],
    alias: webpackPaths,
    symlinks: false,
    fallback: {
      fs: false,
      tls: false,
      net: false,
      path: false,
      zlib: false,
      http: false,
      https: false,
      stream: false,
      crypto: false
    }
  }
}
