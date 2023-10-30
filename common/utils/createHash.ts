/**
 * Generál egy hasht az alábbi patternt követve:
 * {id}-{Date.now()}-{32 random characters}
 * @param id - a Hash elején szereplő azonosító, ez lehet szá és sztring is
 */
export function createHash (id?: string | number): string {
  return `${ id }-${ Date.now() }-${ [ ...Array(32) ].map(() => Math.random().toString(36)[2]).join('') }`
}
