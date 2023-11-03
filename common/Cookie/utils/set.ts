const SEPARATOR = ';'

/**
 * Beállítja az adott cookie-t.
 * @param cookie - Cookie.
 */
export default function set (cookie: string[]): void {
  document.cookie = cookie.join(SEPARATOR)
}
