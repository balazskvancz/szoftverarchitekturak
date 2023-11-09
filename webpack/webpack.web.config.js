const webpackDefault = require('./webpack.config.js')
const { getOptions } = require('./tools/getOptions')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

/**
 * A default webpack configunk.
 * @param {any} env - Env.
 * @param {any} options - Options.
 * @returns {TAnyObject} Default config.
 */
// eslint-disable-next-line default-param-last
module.exports = function webpackWebDefault (env = {}, options) {
  /** @type {any} */
  const opts = getOptions(env, options)

  const config = webpackDefault(env, options)

  config.target = 'web'

  config.module.rules.push(
    require('./rules/images')(opts),
    ...require('./rules/svelte')(opts)
  )

  if (opts.DEV) {
    config.devServer = require('./devServer.js')()
  }

  if (opts.ELECTRON) {
    config.target = 'electron-renderer'
  }

  if (opts.PROD && opts.FAVICON) {
    // config.plugins.push(
      // require('./plugins/favicons')(opts)
    // )
  }

  config.plugins.push(
    new MiniCssExtractPlugin({ filename: 'app.css' })
  )

  return config
}
