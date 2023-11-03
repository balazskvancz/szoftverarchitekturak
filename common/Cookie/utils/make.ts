import Validator from '../../Validator/Validator'

import type { ICookie } from '../definitions'

const ONE_DAY_IN_SECS = 86400

/**
 * A megadott paraméter alapján egy cookie összerakása.
 * @param props - A paraméterek, amikből összeállítjuk a cookie-t.
 */
export default function make (props: ICookie): string[] {
  // eslint-disable-next-line no-restricted-globals
  const cookie = [ `${ props.name }=${ encodeURIComponent(props.value) }` ]

  if (Validator.isNumber(props.daysToLive)) {
    cookie.push(`max-age=${ props.daysToLive * ONE_DAY_IN_SECS }`)
  }

  if (Validator.isString(props.path)) {
    cookie.push(`path=${ props.path }`)
  }

  if (Validator.isString(props.domain)) {
    cookie.push(`domain=${ props.domain }`)
  }

  if (Validator.isString(props.sameSite)) {
    cookie.push(`SameSite=${ props.sameSite }`)
  }

  if (props.isSecure) {
    cookie.push('secure')
  }

  return cookie
}
