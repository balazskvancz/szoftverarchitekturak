import type { ICookieValues } from '../definitions'

/**
 * Leparseolja a fejlécben található sütiket.
 * @param cookieStr - A kiolvasott süti header.
 */
export default function parseCookies (cookieStr: string): ICookieValues {
  const splittedCookies = cookieStr.split(';')

  const cookieValues: ICookieValues = splittedCookies.reduce((acc, curr) => {
    const [ key, value ] = curr.trim().split('=')

    if (key.length > 0) {
      acc[key] = value
    }

    return acc
  }, {} as TMutable<ICookieValues>)

  return cookieValues
}
