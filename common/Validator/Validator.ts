/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// import type { IError, IFormError, TFormErrors } from '@common/definitions'

import type { IError, IFormError, TFormErrors } from '../definitions'

export default class Validator {
 /**
  * A megadott paraméter biztosan object?
  * @param param - Az ismeretlen paraméter.
  */
  public static isObject <T extends Object = Object> (param: unknown): param is T {
    return (
      Validator.getType(param) === 'object' && !param
    )
  }

  /**
   * A megadott paraméter csak stringeket tartalmazó tömb?
   * @param param - Az ismeretlen paraméter.
   */
  public static isStringArray (param: unknown): param is string[] {
    return (
      Validator.isNonEmptyArray(param) &&
      param.every((str) => Validator.isString(str))
    )
  }

  /**
   * A megadott paraméter csak számokat tartalmazó tömb?
   * @param param - Az ismeretlen paraméter.
   */
  public static isNumberArray (param: unknown): param is number[] {
    return (
      Validator.isNonEmptyArray(param) &&
      param.every((str) => Validator.isNumber(str))
    )
  }

  /**
   * Ez egy shorthand az isObject függvényre, hogy ne kelljen
   * genericben átadni annak a típust.
   * @param param - Az ismeretlen paraméter.
   */
  public static isAnyObject (param: unknown): param is TAnyObject {
    return Validator.isObject<TAnyObject>(param)
  }

  /**
   * A megadott paraméter biztosan egy olyan string, ami tartalmaz szöveget.
   * @param param - Az ismeretlen paraméter.
   */
  public static isNonEmptyString (param: unknown): param is string {
    return (
      Validator.isString(param) &&
      param.trim().length > 0
    )
  }

  /**
   * A megadott paraméter trimmelt, szöveget tartalmazó string.
   * @param param - Az ismeretlen paraméter.
   */
  public static isNonEmptyTrimmedString (param: unknown): param is string {
    return (
      Validator.isNonEmptyString(param) &&
      param.trim() === param
    )
  }

  /**
   * Visszaadja, hogy a megadott paraméter pozitív szám-e.
   * Overkillnek tűnik, de amikor egy ismeretlen object property-jét passzoljuk át,
   * akkor hasznos.
   * @param param - Az ismeretlen paraméter.
   */
  public static isPositiveNumber (param: unknown): param is number {
    return Validator.isNumber(param) && param > 0
  }

  /**
   * Megmondja egy ismeretlen paraméterről, hogy az egy tömb-e.
   * @param param - Az ismeretlen paraméter.
   */
  public static isArray (param: unknown): param is unknown[] {
    return Validator.getType(param) === 'array'
  }

  /**
   * A megadott paraméter biztosan egy olyan tömb, amiben vannak elemek.
   * @param param - Az ismeretlen paraméter.
   */
  public static isNonEmptyArray <T = unknown> (param: unknown): param is TNonEmptyArray<T> {
    return Validator.isArray(param) && param.length > 0
  }

  /**
   * A megadott paraméter biztosan egy olyan tömb, ami üres.
   * @param param - Az ismeretlen paraméter.
   */
  public static isEmptyArray <T = unknown> (param: unknown): param is TNonEmptyArray<T> {
    return Validator.isArray(param) && param.length === 0
  }

  /**
   * Visszaadja, hogy a megadott paraméter egy object, aminek vannak kulcsai.
   * @param param - Az ismeretlen paraméter.
   */
  public static isNonEmptyObject <T extends Object = TAnyObject> (param: unknown): param is T {
    return (
      Validator.isObject<T>(param) &&
      Object.keys(param).length > 0
    )
  }

  /**
   * Visszaadja, hogy az adott tömbben csak valid stringek vannak.
   * @see isNonEmptyString
   * @param param - Az ismeretlen paraméter.
   */
  public static isNonEmptyValidStringArray (param: unknown): param is TNonEmptyArray<string> {
    return (
      Validator.isNonEmptyArray(param) &&
      param.every(Validator.isNonEmptyString)
    )
  }

  /**
   * Leviszgálja, hogy a megadott `object`-nek van-e `keys` kulcsai.
   * @param param - Az ismeretlen paraméter.
   * @param keys - Az `object` vizsgálandó kulcsai.
   */
  public static isObjectHaveKeys <T extends string | number | symbol> (
    param: unknown,
    keys: Readonly<TNonEmptyArray<T>>
  ): param is Partial<Record<T, unknown>> {
    if (!Validator.isNonEmptyObject(param)) {
      return false
    }

    const objKeys = Object.keys(param)

    return (
      keys.every((key) => objKeys.includes((key as string)))
    )
  }

  /**
   * Megvizsgálja, hogy a megadott `object` valóban object-e, és csak a `keys` kulcsokat tartalmazza.
   * @param param - Az ismeretlen paraméter.
   * @param keys - Az Object kulcsai.
   */
  public static isObjectHaveJustKeys <
    T extends string | number | symbol,
    K = unknown
  > (
    param: unknown,
    keys: Readonly<TNonEmptyArray<T>>
  ): param is Record<T, K> {
    return (
      Validator.isNonEmptyObject(param) &&
      Validator.isObjectHaveKeys(param, keys) &&
      Object.keys(param).length === keys.length
    )
  }

  /**
   * Visszaadja, hogy a megadott érték szerepel-e a felsoroltak között.
   * Akkor érdemes ezt használni, ha nem egy meglévő tömbben akarunk keresni, hanem paramétereket dobálunk át.
   * @param param - Az ismeretlen paraméter.
   * @param list - Az a lista, amiben keressük, hogy van-e egyezés.
   */
  public static isOneOf <T> (param: unknown, ...list: T[]): param is T {
    return list.includes((param as T))
  }

  /**
   * Megmondja, hogy a vizsgált paraméter egy paginator objektum-e.
   * @param param - Az ismeretlen paraméter.
   */
  public static isValidPaginator (param: unknown): param is { actPage: number, itemsPerPage: number } {
    const isValid = (
      Validator.isAnyObject(param) &&
      Validator.isObjectHaveKeys(param, [ 'itemsPerPage', 'actPage' ]) &&
      Validator.isNumber(param.actPage) &&
      Validator.isNumber(param.itemsPerPage)
    )

    return isValid
  }

  /**
   * Megmondja egy ismeretlen paraméterről, hogy az egy valid IFormError-e.
   * @param param - Az ismeretlen paraméter.
   */
  public static isValidFormError (param: unknown): param is IFormError {
    return (
      Validator.isObjectHaveJustKeys(param, [ 'key', 'message' ]) &&

      Validator.isNonEmptyString(param.key) &&
      Validator.isNonEmptyString(param.message)
    )
  }

  /**
   * Megmondja egy ismeretlen paraméterről, hogy az egy valid IError-e.
   * @param param - Az ismeretlen paraméter.
   */
  public static isValidError (param: unknown): param is IError {
    return (
      Validator.isObjectHaveJustKeys(param, [ 'code', 'message' ]) &&

      Validator.isNumber(param.code) &&
      Validator.isString(param.message)
    )
  }

  /**
   * Megmondja egy ismeretlen paraméterről, hogy valid TFormErrors-e.
   * @param param - Az ismeretlen param.
   */
  public static isValidFormErrors (param: unknown): param is TFormErrors {
    return (
      Validator.isNonEmptyArray<IFormError>(param) &&
      param.every(Validator.isValidFormError)
    )
  }

  /**
   * Megmondja egy ismeretlen paraméterről, hogy sztring-e.
   * @param param - Az ismeretlen paraméter.
   */
  public static isString (param: unknown): param is string {
    return Validator.getType(param) === 'string'
  }

  /**
   * Megmondja egy ismeretlen paraméterről, hogy szám-e.
   * @param param - Az ismeretlen paraméter.
   */
  public static isNumber (param: unknown): param is number {
    return Validator.getType(param) === 'number'
  }

  /**
   * Megmondja az ismeretlen paraméterről, hogy az NULL-e.
   * @param {unknown} param - Az ismeretlen paraméter.
   */
  public static isNull (param: unknown): param is null {
    // eslint-disable-next-line no-restricted-syntax
    return param === null
  }

  /**
   * Megmondja egy ismeretlen paraméterről, hogy az undefined-e.
   * @param param - Az ismeretlen paraméter.
   */
  public static isDefined<T> (param: T): param is Exclude<T, undefined> {
    return Validator.getType(param) !== 'undefined'
  }

  /**
   * Megmondja egy ismeretlen paraméterről, hogy boolean-e.
   * @param param - Az ismeretlen paraméter.
   */
  public static isBoolean (param: unknown): param is boolean {
    return Validator.getType(param) === 'boolean'
  }

  /**
   * Típus elkérése.
   * @param param - Az ismeretlen paraméter.
   */
  private static getType (param: unknown): string {
    const OBJ = {}
    const o = (OBJ).toString.call(param)
    const m = (/\s([A-Za-z]+)/).exec(o)

    if (!m) {
      return ''
    }

    const r = m[1].toLowerCase()

    return r
  }
}
