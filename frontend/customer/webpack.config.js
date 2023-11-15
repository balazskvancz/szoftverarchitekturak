require('module-alias/register')

const path = require('node:path')

const { nodePaths } = require('@root/paths')

const { WebpackConfigurator } = require('../../webpack/Configurator')

const ENTRY = path.resolve(__dirname)
const DIST  = path.resolve(nodePaths.dist, 'customer_frontend')

const TITLE = 'Csomagküldő – Felhasználó'

/**
 * Admin oldal webpack configja.
 * @param {TAnyObject} env - A környezeti változók.
 * @param {TAnyObject} argv - Egyéb beállítások.
 * @returns {unknown} A config, amit a wp használni fog.
 */
module.exports = (env, argv) => {
  const wpc = new WebpackConfigurator(env, argv, {
    type: 'web',
    projectFolder: ENTRY,
    dist: DIST
  })

  wpc.addPlugin(
    new WebpackConfigurator.plugins.HtmlWebpackPlugin({
      filetype: 'pug',
      template: `${ ENTRY }/index.html`,
      title: TITLE,
      filename: 'index.html',
      minify: WebpackConfigurator.tools.htmlMinifyOptions
    })
  )

  /**
   * @type {any}
   */
  const cfg = wpc.getConfig()

  cfg.entry = {
    main: path.resolve(__dirname, 'main.ts')
  }

  cfg.resolve.mainFields = [ 'svelte', 'browser', 'module', 'main' ]
  cfg.resolve.conditionNames = [ 'svelte', 'browser', 'import' ]
  cfg.resolve.alias.svelte = path.resolve('node_modules', 'svelte/src/runtime')

  return cfg
}
