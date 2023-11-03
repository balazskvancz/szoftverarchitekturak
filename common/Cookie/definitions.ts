export interface ICookie {
  readonly name: string
  readonly value: string | number | boolean
  readonly daysToLive?: number
  readonly path?: string
  readonly domain?: string
  readonly isSecure?: boolean
  /** @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite#lax}. */
  readonly sameSite?: 'Lax' | 'Strict' | 'None'
}
