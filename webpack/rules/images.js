require('module-alias/register')

const path = require('path')

const OUTPUT_NAME = '[name]-[hash:6].[ext]'
const OUTPUT_PATH = 'images'

module.exports = function images (/** @type {any} */ opts) {
  return {
    // https://github.com/webpack-contrib/file-loader
    // https://webpack.js.org/configuration/module/#ruleoneof
    test: /\.(gif|jpe?g|png|svg)$/i,
    oneOf: [
      {
        resourceQuery: /inline/, // foo.jpg?inline
        loader: 'url-loader',
        options: {
          limit: true
        }
      },
      {
        resourceQuery: /raw/, // foo.svg?raw
        loader: 'raw-loader' // Az svg tartalmát adja át
      },
      {
        // https://github.com/dazuaz/responsive-loader
        resourceQuery: /responsive/, // bar.png?responsive
        loader: 'responsive-loader',

        // https://github.com/dazuaz/responsive-loader#options
        options: {
          name: OUTPUT_NAME,
          outputPath: OUTPUT_PATH,
          sizes: [ 320, 640, 960, 1200, 1800, 2400 ],
          placeholder: true,
          placeholderSize: 10,
          quality: 85, // default
          esModule: true // tree shaking miatt jobb
        }
      },
      {
        loader: 'file-loader',
        options: {
          name: opts.DEV
            ? OUTPUT_NAME
            // eslint-disable-next-line operator-linebreak
            :
            /**
             * Custom fileName feldolgozó.
             * @url https://v4.webpack.js.org/loaders/file-loader/#function
             * @param {string} resourcePath - A fájl teljes elérési útja.
             * @returns {string} A fájlnév mentési szabálya.
             */
            (resourcePath) => {
              const fileName = path.basename(resourcePath).replace(path.extname(resourcePath), '')
              const slugName = (fileName)

              return `${ slugName }-[hash:6].[ext]`
            },

          outputPath: OUTPUT_PATH,

          // https://stackoverflow.com/questions/59070216/webpack-file-loader-outputs-object-module
          esModule: false
        }
      }
    ],
    // https://github.com/webpack-contrib/css-loader/releases/tag/v6.0.0 --> https://webpack.js.org/guides/asset-modules/
    type: 'javascript/auto'
  }
}
