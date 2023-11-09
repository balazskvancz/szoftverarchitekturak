/**
 * Az Object.entries-t alakítja át típusbiztosra, az Object.keys-hez hasonlóan a kulcsokat itt is string-ben adja vissza.
 * @template {Object} T
 * @template {keyof T} K
 * @param {T} object - A megadott Object.
 * @returns {readonly [ K, T[K] ][]} A típusbiztos tömb.
 */
module.exports.getEntries = function getEntries (object) {
  /** @type {unknown[]} */
  // eslint-disable-next-line no-restricted-globals
  const entries = Object.entries(object)
  const typed = /** @type {readonly [ K, T[K] ][]} */ (entries)

  return typed
}
