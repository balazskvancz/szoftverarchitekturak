import type { ISearchOffset } from '../definitions'

interface IOffsetReduce extends ISearchOffset {
  isTerminated: boolean
}

/**
 * Visszaadja, hogy mekkora offsettel kell eltolni a tárolt és a keresendő kulcsot.
 * @param firstUrl            - Az első URL.
 * @param secondUrl           - A második URL.
 * @param isCurrentlyWildCard - Éppen wildcard-e.
 */
export default function getOffset (firstUrl: string, secondUrl: string, isCurrentlyWildCard: boolean): ISearchOffset {
  const spl = firstUrl.split('')

  const cUrlLength = spl.length
  const sUrlLength = secondUrl.length

  const initValue: IOffsetReduce = {
    isWildcard: isCurrentlyWildCard,
    keyOne: 0,
    keyTwo: 0,
    isTerminated: false
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { isTerminated: _, ...offset } = spl.reduce((acc, curr) => {
    if (
      acc.isTerminated ||             // Ha valami miatt megálltunk.
        acc.keyOne >= cUrlLength ||   // Ha a tárolt kulcs indexelése túlcsordulna.
        acc.keyTwo >= sUrlLength      // Ha az illesztendő url indexelése túlcsordulna.
    ) {
      return acc
    }

    // Ekkor éppen egy olyan helyen vagyunk, ahol egy wildcard param kezdődik.
    if (curr === ':') {
      acc.isWildcard = true
      acc.keyOne = acc.keyOne + 1

      return acc
    }

    // Ha éppen jön egy elválasztó ÉS egyébként wildcard-ban voltunk,
    // akkor most kell korrigálni az illesztendő kulcsot.
    if (curr === '/' && acc.isWildcard) {
      acc.isWildcard = false

      const searchKeyRem = secondUrl.slice(acc.keyTwo)

      const index = searchKeyRem.indexOf('/')

      const inc = index === -1
        ? searchKeyRem.length
        : index + 1 // Mivel ha mondjuk az 1. indexen van a /, akkor 2-vel kell shiftelni.

      acc.keyOne = acc.keyOne + 1
      acc.keyTwo = acc.keyTwo + inc

      return acc
    }

    // Ha éppen wildcard-on vagyunk, akkor egyszerűen
    // csak növeljük az egyes kulcs counterjét.
    if (acc.isWildcard) {
      acc.keyOne = acc.keyOne + 1

      return acc
    }

    // Ha nincs egyezés, akkor végeztük.
    if (curr !== secondUrl[acc.keyTwo]) {
      acc.isTerminated = true

      return acc
    }

    // Mindkettő indexet lehet inc.
    acc.keyOne = acc.keyOne + 1
    acc.keyTwo = acc.keyTwo + 1

    return acc
  }, initValue)

  return offset
}
