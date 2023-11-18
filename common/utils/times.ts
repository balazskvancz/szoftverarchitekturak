/**
 * Deklaratív times.
 * @param n         - Hányszor.
 * @param iteratee  - Milyen művelet.
 */
export default function times <T> (n: number, iteratee: (num: number) => T): T[] {
  return Array.from({ length: n }, (_, i) => {
    return iteratee(i)
  })
}
