/* eslint-disable no-undef */
/**
 * @typedef {`/${ string }`} TRoute
 * @typedef {string} THost
 * @typedef {`${ string }:${ string }`} THostAndPort
 */

/**
 * @typedef {(req: any, res: any) => void} TBypassCallback
 */

/**
 * Webpack proxy speciálisan megadott route-okhoz.
 * @url https://webpack.js.org/configuration/dev-server/#devserverproxy
 * @param {TRoute} route - A route.
 * @param {TBypassCallback} callback - A bypass függvény.
 * @returns {Record<TRoute, { bypass: TBypassCallback }>} A route object.
 */
function makeBypassProxy (route, callback) {
  return {
    [route]: {
      bypass: (req, res) => {
        callback(req, res)

        return false
      }
    }
  }
}

module.exports.makeBypassProxy = makeBypassProxy
