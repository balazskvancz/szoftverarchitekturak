/* eslint-disable no-undef */
require('module-alias/register')

const path = require('path')

const { nodePaths } = require('@root/paths')

const { WebpackConfigurator } = require('@root/webpack/Configurator')

const ENTRY = path.join(nodePaths.root, 'backend', 'exampleService')
const DIST  = path.join(nodePaths.dist, 'exampleService')

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
    main: path.join(__dirname, 'backend.ts')
  })

  return wpc.getConfig()
}
