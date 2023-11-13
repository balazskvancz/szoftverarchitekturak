require('module-alias/register')

/**
 * @typedef {Object} IEnv
 * @property {string} dist
 * @property {string[]} tsPaths
 * @property {string} projectFolder
 * @property {string} localIdentName
 * @property {boolean} cordova
 * @property {boolean} electron
 */

/**
 * @typedef {Object} IOptions
 * @property {'development' | 'production' | 'none'} mode
 * @property {boolean} PROD
 * @property {boolean} DEV
 * @property {string} PROJECT_FOLDER
 * @property {string[]} TS_PATHS
 * @property {string} HASH
 * @property {string} CSS_LOCAL_IDENT
 * @property {boolean} CORDOVA
 * @property {boolean} ELECTRON
 * @property {string} DIST
 * @property {string} FAVICON
 */

/**
 * @throws {TypeError}
 * @param {any} env - A cli env, a saját dolgokkal kiegészítve.
 * @param {any} options - A cli options.
 * @param {boolean} [log=false] - Logolja a legfontosabb adatokat?
 * @returns {IOptions} A beállítási objectünk.
 */
function getOptions (env, options, log = false) {
  // Fejlesztünk vagy production build lesz?
  const { mode } = options
  const PROD     = mode === 'production'
  const DEV      = !PROD || (mode === 'development')

  const HASH = DEV
    ? 'fullhash'
    : 'contenthash'

  const CORDOVA = typeof env.cordova !== 'undefined'
  const ELECTRON = typeof env.electron !== 'undefined'
  const DIST = env.dist
  const TS_PATHS = env.tsPaths
  const PROJECT_FOLDER = env.projectFolder
  const CSS_LOCAL_IDENT = env.localIdentName || (PROD ? '[hash:base64]' : '[local]--[hash:base64:5]')

  if (log) {
    console.log(`
      mode: ${ mode },
      PROD: ${ PROD },
      DEV: ${ DEV },
      HASH: ${ HASH },
      CSS_LOCAL_IDENT: ${ CSS_LOCAL_IDENT }
      CORDOVA: ${ CORDOVA },
      ELECTRON: ${ ELECTRON },
      TS_PATHS: ${ TS_PATHS },
      PROJECT_FOLDER: ${ PROJECT_FOLDER },
      OPTIMIZATION: ${ JSON.stringify(env.optimization ?? {}) },
    `)

    console.log('') // Üres sor
  }

  if (!PROJECT_FOLDER) {
    throw new TypeError('HIBA! Nincs megadva a projectFolder!')
  }

  if (typeof TS_PATHS !== 'object') {
    throw new TypeError(' HIBA! Nincs megadva a tsPaths!')
  }

  if (PROD && log) {
    console.log('build kimenet:', DIST, '\n')
  }

  return {
    mode,
    PROD, DEV,
    PROJECT_FOLDER,
    TS_PATHS,
    HASH,
    CORDOVA, ELECTRON,
    CSS_LOCAL_IDENT,
    DIST,
    FAVICON: typeof env.favicon === 'string' ? env.favicon : undefined
  }
}

module.exports = {
  getOptions
}
