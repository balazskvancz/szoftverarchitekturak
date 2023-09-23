/* eslint-disable no-undef */
module.exports = function watchOptions () {
  return {
    // Azt írja a wp doksi, hogy jobb, ha ez true
    // https://webpack.js.org/configuration/watch/#watchoptionspoll
    poll: true,

    // node_modules fájlokat ne vegye figyelembe
    // wp4: /node_modules/ ---> wp4 alatt EZT ÁT NE IRD, mert 100%-os CPU kihasználtság lehet!
    ignored: /node_modules/
  }
}
