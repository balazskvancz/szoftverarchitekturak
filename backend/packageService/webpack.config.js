/* eslint-disable no-undef */
require('module-alias/register')

const path = require('path')

const { nodePaths } = require('@root/paths')

const { WebpackConfigurator } = require('@root/webpack/Configurator')

const ENTRY = path.join(nodePaths.root, 'backend', 'packageService')
const DIST  = path.join(nodePaths.dist, 'packageService')

/**
 * Example.
 * @param {TAnyObject} env - A környezeti változók.
 * @param {TAnyObject} argv - Egyéb beállítások.
 * @returns {unknown} A config, amit a wp használni fog.
 */
module.exports = (env, argv) => {
  const wpc = new WebpackConfigurator(env, argv, {
    type: 'node',
    projectFolder: ENTRY,
    dist: DIST
  })

  wpc.setEntry({
    main: path.join(__dirname, 'main.ts')
  })

  return wpc.getConfig()
}
