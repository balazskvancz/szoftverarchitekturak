require('module-alias/register')

const { tsPaths } = require('@root/paths')

module.exports = function typescript (/** @type {any} */ opts) {
  return {
    test: /\.tsx?$/,
    loader: 'ts-loader',
    exclude: /node_modules/,
    options: {
      onlyCompileBundledFiles: true,
      compilerOptions: {
        paths: {
          '*': opts.TS_PATHS,
          ...tsPaths
        }
      },
      transpileOnly: true
    }
  }
}
