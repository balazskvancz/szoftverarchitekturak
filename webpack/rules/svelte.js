const sveltePreprocess = require('svelte-preprocess')

module.exports = function svelte (/** @type {any} */ opts) {
  // https://github.com/sveltejs/svelte-loader
  return [
    {
      test: /.svelte$/,
      use: {
        loader: 'svelte-loader',
        options: {
          // @ts-ignore
          preprocess: sveltePreprocess(),

          compilerOptions: {
            // NOTE Svelte's dev mode MUST be enabled for HMR to work
            dev: opts.DEV // Default: false
          },

          // https://github.com/sveltejs/svelte-loader#extracting-css
          emitCss: true,

          // Enable HMR only for dev mode
          hotReload: opts.DEV, // Default: false

          // Extra HMR options, the defaults are completely fine
          // You can safely omit hotOptions altogether
          hotOptions: {
            // Meg tudjuk tartani HRM esetén a komponens állapotát.
            preserveLocalState: true,

            // If this string appears anywhere in your component's code, then local
            // state won't be preserved, even when noPreserveState is false
            noPreserveStateKey: '@!hmr',

            // Prevent doing a full reload on next HMR update after fatal error
            noReload: true,

            // Try to recover after runtime errors in component init
            optimistic: true,

            // --- Advanced ---

            // Prevent adding an HMR accept handler to components with
            // accessors option to true, or to components with named exports
            // (from <script context="module">). This have the effect of
            // recreating the consumer of those components, instead of the
            // component themselves, on HMR updates. This might be needed to
            // reflect changes to accessors / named exports in the parents,
            // depending on how you use them.
            acceptAccessors: true,
            acceptNamedExports: true
          }
        }
      }
    },
    {
      // required to prevent errors from Svelte on Webpack 5+, omit on Webpack 4
      test: /node_modules\/svelte\/.*\.mjs$/,
      resolve: {
        fullySpecified: false
      }
    }
  ]
}
