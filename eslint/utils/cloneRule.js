const cloneDeep = require('lodash/cloneDeep')

const { getRule } = require('./getRule')

/**
 * Klónozza az eredeti szabályt.
 * @param {string} key - Az eredeti eslint szabály.
 * @returns {any} Az eredeti definíció.
 */
module.exports.cloneRule = function cloneRule (key) {
  const rule = getRule(key)
  const clone = cloneDeep(rule)

  return clone
}
