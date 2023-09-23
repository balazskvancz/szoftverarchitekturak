// https://webpack.js.org/configuration/output/
// eslint-disable-next-line no-undef
module.exports = function output (/** @type {any} */ opts) {
  return {
    path: opts.DIST,
    filename: `[name].[${ opts.HASH }].js`,
    chunkFilename: `[name].[${ opts.HASH }].js`,
    publicPath: opts.DEV ? 'http://localhost:8080/' : '',
    pathinfo: false,
    clean: true,
    compareBeforeEmit: false
  }
}
