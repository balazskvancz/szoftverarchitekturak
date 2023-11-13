module.exports = function localCss (/** @type {any} */ opts) {
  return {
    test: /\.css$/,
    exclude: [ /node_modules/ ],
    /** Ez kell, hogy az (S)CSS fájlokat ne tree-shakelje! */
    sideEffects: true,
    use: [
      opts.DEV
        /** @see {@link https://github.com/webpack-contrib/style-loader} */
        ? 'style-loader'
        /** @see {@link https://github.com/webpack-contrib/mini-css-extract-plugin} */
        : require('mini-css-extract-plugin').loader,
      {
        /** @see {@link https://github.com/webpack-contrib/css-loader} */
        loader: 'css-loader',

        /** @see {@link https://github.com/webpack-contrib/css-loader#options} */
        options: {
          /** Lehessen css fájlokon belül importálni, amik require-re alakulnak át. */
          import: true,
          modules: {
            localIdentName: opts.CSS_LOCAL_IDENT,

            /** @see {@link https://github.com/webpack-contrib/css-loader#exportlocalsconvention} */
            exportLocalsConvention: 'camelCase'
          },
          /** @see {@link https://github.com/webpack-contrib/css-loader#importloaders} */
          importLoaders: 1
        }
      },
      {
        /**
         * A loader automatikusan megkeresi a gyökérben található config fájlt.
         * @see {@link https://github.com/postcss/postcss-loader}
         */
        loader: 'postcss-loader'
      }
    ]
  }
}
