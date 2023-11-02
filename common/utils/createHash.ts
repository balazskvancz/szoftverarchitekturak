/**
 * Generál egy hasht az alábbi patternt követve:
 * {id}-{Date.now()}-{32 random characters}.
 * @param id - A Hash elején szereplő azonosító, ez lehet szá és sztring is.
 */
export function createHash (id?: string | number): string {
  const arrayLength = 32

  return `${ id }-${ Date.now() }-${ [ ...Array(arrayLength) ].map(() => Math.random().toString(36)[2]).join('') }`
}
