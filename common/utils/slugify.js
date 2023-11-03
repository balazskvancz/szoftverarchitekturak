/**
 * Szöveg slugosítása.
 * @url https://lucidar.me/en/web-dev/how-to-slugify-a-string-in-javascript/
 * @param {string} text - A szöveg.
 * @returns {string} A slugosított szöveg.
 */
module.exports.slugify = function slugify (text) {
  let str = text
    .replace(/^\s+|\s+$/g, '')
    .toLowerCase()

  // Remove accents, swap ñ for n, etc
  const from = 'ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛŰÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöőòôõøðřŕšťúůüùûűýÿžþÞĐđßÆa·/_,:;'
  const to   = 'AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUUYYZaaaaaacccdeeeeeeeeiiiinnoooooooorrstuuuuuuyyzbBDdBAa------'

  for (let i = 0, l = from.length ; i < l ; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
  }

  // Remove invalid chars
  str = str.replace(/[^\d \-a-z]/g, '')
    // Collapse whitespace and replace by -
    .replace(/\s+/g, '-')
    // Collapse dashes
    .replace(/-+/g, '-')

  return str
}
