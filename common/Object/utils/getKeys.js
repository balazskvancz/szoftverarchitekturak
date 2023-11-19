/**
 * A natív Object.keys string tömböt ad vissza, viszon ezzel megkapjuk a rendes típust is.
 * @template {string} K
 * @param {Partial<TReadonlyRecord<K, unknown>>} object - Az objektum, aminek a kulcsait szeretnénk elkérni.
 * @returns {readonly K[]} A kulcsokat tartalmazó, típusbiztos tömb.
 */
module.exports.getKeys = function getKeys (object) {
  // eslint-disable-next-line no-restricted-globals
  const keys = /** @type {K[]} */ (Object.keys(object))

  return keys
}
