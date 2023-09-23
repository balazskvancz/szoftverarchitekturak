const { cloneRule } = require('./cloneRule')

 /**
  * Egy eredeti eslint szabály felülbírálása.
  * A TypeScript sok szabályt extendál és jobbá tesz, de hogy konzisztensek legyünk az eredetivel
  * azt behúzzuk és csak felülbíráljuk.
  * @param {string} key - Az objectum kulcsa.
  * @param {any} [definition] - A definiíció, amivel felül akarjuk verni.
  * @returns {any} Az új definíció.
  */
module.exports.setRule = function setRule (key, definition) {
  // A sima getRule-t lecseréltük itt clone-ra, mivel megtörtént velünk,
  // hogy a typescript-eslint az általunk megadott object-be kezdett default értékeket pakolni,
  // ami már az eslint számára volt értelmezhetetlen.
  const rule = cloneRule(key)

  if (!definition) {
    return rule
  }

  const res = [
    rule[0],
    {
      ...rule[1],
      ...definition
    }
  ]

  return res
}
