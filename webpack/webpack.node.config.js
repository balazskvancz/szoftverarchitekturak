/* eslint-disable no-undef */

// https://github.com/Izhaki/nodemon-webpack-plugin
const NodemonPlugin = require('nodemon-webpack-plugin')

const webpackDefault = require('./webpack.config.js')
const { getOptions } = require('./tools/getOptions')

/**
 * Összerakja a nodejs wp configunkat.
 * @param {any} env - A cli env.
 * @param {any} options - A cli options.
 * @returns {any} A backend / nodejs környezethez való wp configunk.
 */
// eslint-disable-next-line default-param-last
module.exports = function webpackNodeDefault (env = {}, options) {
  const opts = getOptions(env, options)

  const config = webpackDefault(env, options)

  config.target = 'node'

  config.output.filename      = '[name].js'
  config.output.chunkFilename = '[name].js'

  if (opts.DEV) {
    config.plugins.push(
      new NodemonPlugin({
        /**
         * @see {@link https://stackoverflow.com/questions/42088007/is-there-source-map-support-for-typescript-in-node-nodemon}
         * @see {@link https://github.com/Izhaki/nodemon-webpack-plugin#with-config}
         */
        nodeArgs: [ '--enable-source-maps' ],
        env: {
          NODE_ENV: 'development'
        },
        verbose: true
      })
    )
  }

  if (opts.PROD) {
    config.devtool = 'source-map'
  }

  config.node = {
    __dirname: true
  }

  config.optimization = {
    minimize: false
  }

  config.externals = {
    puppeteer: "require('puppeteer')"
  }

  return config
}
