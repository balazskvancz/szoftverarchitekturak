/* eslint-disable no-undef */

// https://webpacks.org/guides/development/
// https://hackernoon.com/a-tale-of-webpack-4-and-how-to-finally-configure-it-in-the-right-way-4e94c8e7e5c1
// https://slack.engineering/keep-webpack-fast-a-field-guide-for-better-build-performance-f56a5995e8f1

const webpack = require('webpack')
const { getOptions } = require('./tools/getOptions')

/**
 * Összerakja a web- és a node-felé is közös configot.
 * @param {any} env - A cli env.
 * @param {any} options - A cli options.
 * @returns {any} Az alap webpack configunk.
 */
// eslint-disable-next-line default-param-last
module.exports = function webpackDefault (env = {}, options) {
  const opts = getOptions(env, options, true)

  const config = {
    watchOptions: require('./watchOptions')(),
    output:       require('./output')(opts),
    resolve:      require('./resolve')(),

    module: {
      rules: [
        require('./rules/typescript')(opts)
      ]
    },

    plugins: [
      // Ezeket mindenhol használjuk
      new webpack.DefinePlugin({
        __DEV__: opts.DEV,
        __TEST__: false,
        __PROD__: opts.PROD,
        // eslint-disable-next-line no-restricted-globals
        "require('module-alias/register')": JSON.stringify(';')
      })
    ]
  }

  config.plugins.push(
    // @ts-ignore
    require('./plugins/eslint')(opts)
  )

  if (opts.PROD) {
    config.bail = true
  }
  else {
    config.devtool = require('./devtool')(opts)
  }

  return config
}
