const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

/**
 * Generál egy random szöveget.
 * @param length  - A szöveg hossza.
 * @param acc     - Accumulator.
 * @param chars   - A kerekterek értékkészlete.
 */
export default function getRandomLetters (length: number, acc?: string[], chars = CHARS): string {
  if (acc && acc.length === length) {
    return acc.join('')
  }

  const pos = Math.floor(Math.random() * ((chars.length)))

  const newAcc = acc ?? []

  return getRandomLetters(length, [ ...newAcc, chars[pos] ], chars)
}
