/**
 * @typedef {any} TEslintRule
 * @typedef {Record<string,TEslintRule>} IEslintConfig
 */

/**
 * @type {IEslintConfig} A sima eslitn szabályokat tartalmazó objektum.
 */
const BASE_ESLINT_CONFIG = require('../rules/eslint.js')

 /**
  * Az eredeti eslint szabályaink közül az adott definíciót adja vissza, vagy hibát dob.
  * @throws {TypeError}
  * @param {string} key - Az eredeti eslint szabály.
  * @returns {any} Az eredeti definíció.
  */
module.exports.getRule = function getRule (key) {
  if (!BASE_ESLINT_CONFIG[key]) {
    throw new TypeError(`[ESLINT] nincs ilyen kulcs: ${ key }`)
  }

  const rule = BASE_ESLINT_CONFIG[key]

  return rule
}
