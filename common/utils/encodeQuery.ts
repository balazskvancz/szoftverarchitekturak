/* eslint-disable no-restricted-globals */
import { Object } from '@common/Object/Object'
import Validator  from '@common/Validator/Validator'

export default function encodeQuery (data: TAnyObject): string {
  const encoded = Object
    .getKeys(data)
    .map((key) => {
      const encodedKey = encodeURIComponent(key)
      const rawValue   = data[key]

      const encodedValue = Validator.isDefined(rawValue)
        ? encodeURIComponent(rawValue)
        : null

      if (Validator.isNonEmptyString(encodedValue)) {
        return `${ encodedKey }=${ encodedValue }`
      }

      return encodedKey
    })
    .join('&')

  return encoded
}
