  /**
   * Visszaadja a megadott két URL leghosszabb közös részét.
   * @param firstUrl  - Az első URL.
   * @param secondUrl - A második URL.
   */
export default function getLongestCommonPrefix (firstUrl: string, secondUrl: string): number {
  const splittedFirst  = firstUrl.split('')
  const splittedSecond = secondUrl.split('')

  const min = splittedSecond.length < splittedFirst.length
    ? splittedSecond.length
    : splittedFirst.length

  const { counter } = splittedFirst.reduce((acc, curr, index) => {
    if (acc.isTerminated) {
      return acc
    }

    if (acc.counter >= min) {
      return acc
    }

    if (curr !== splittedSecond[index]) {
      acc.isTerminated = true

      return acc
    }

    acc.counter = acc.counter + 1

    return acc
  }, { counter: 0, isTerminated: false } as { counter: number, isTerminated: boolean })

  return counter
}
