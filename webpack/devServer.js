// https://webpack.js.org/configuration/dev-server/
// https://github.com/webpack/webpack-dev-server/blob/master/migration-v4.md

module.exports = function devServer () {
  return {
    historyApiFallback: true,

    allowedHosts: 'all',

    hot: true,

    // https://webpack.js.org/configuration/dev-server/#devserverclient
    client: {
      logging: 'info',

      overlay: {
        errors: true,

        warnings: false
      },

      progress: true
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*'
    }
  }
}
