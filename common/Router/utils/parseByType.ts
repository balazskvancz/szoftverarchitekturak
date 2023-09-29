type TReturnType = string | number | boolean

/**
 * Egy megadott sztringet alakít át számra, boolean-re
 * vagy hagyja azt eredeti formában.
 * @param value - A parseolandó adat.
 */
export default function parseByType (value: string): TReturnType {
  if ((/^[+-]?\d+$/).test(value)) { // number
    return parseInt(value)
  }

  if ((/^(?:true|false)$/).test(value)) { // boolean
    return (value === 'true')
  }

  return value
}
