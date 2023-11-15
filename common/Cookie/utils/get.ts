import Validator from '@common/Validator/Validator'

const SEPARATOR = ';'
const EQUAL     = '='

/**
 * Leparseolja a süti sztringet majd visszaadja a keresett name=value értéket.
 * @param cookieStr - Süti szrring.
 * @param name      - A cookie neve.
 */
export default function get (
  cookieStr: string,
  name: string
): string | undefined {
  const cookieParts = cookieStr
    .split(SEPARATOR)
    .filter(Validator.isNonEmptyString)
    .map((e) => e.trim())

  if (!Validator.isNonEmptyArray<string>(cookieParts)) {
    return undefined
  }

  const value: string | undefined = cookieParts
    .reduce((acc: string | undefined, curr) => {
      if (Validator.isDefined(acc)) {
        return acc
      }

      const [ key, val ] = curr.split(EQUAL)

      if (key === name) {
        return val
      }

      return acc
    }, undefined)

  return value
}
