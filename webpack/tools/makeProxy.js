/* eslint-disable no-undef */
const DEFAULT_ROUTE = '/api'
const DEFAULT_HOST  = 'http://localhost'
const DEFAULT_PORT  = 3000

/**
 * @typedef {`/${ string }`} TRoute
 * @typedef {string} THost
 * @typedef {`${ string }:${ string }`} THostAndPort
 */

/**
 * Webpack proxy speciálisan megadott route-okhoz.
 * @url https://webpack.js.org/configuration/dev-server/#devserverproxy
 * @param {TRoute} [route=DEFAULT_ROUTE] - A route.
 * @param {THost} [host=DEFAULT_HOST] - A host.
 * @param {number} [port=DEFAULT_PORT] - A port.
 * @returns {Record<string, THostAndPort>} A route object.
 */
function makeProxy (
  route = DEFAULT_ROUTE,
  host = DEFAULT_HOST,
  port = DEFAULT_PORT
) {
  const httpHost = `http://${ host.replace('http://', '') }`

  return {
    [route]: `${ httpHost }:${ port }`
  }
}

module.exports.makeProxy = makeProxy
