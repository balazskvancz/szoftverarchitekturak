import { createHash } from 'crypto'

const HASHING_ALGORITHM = 'sha256'

/**
 * Egyszerű szöveg SHA256 hashé alakítása.
 * @param plainText - A nyers szöveg.
 */
export default function createPassword (plainText: string): string {
  const hasher = createHash(HASHING_ALGORITHM)

  return hasher.update(plainText).digest('hex')
}
