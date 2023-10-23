type TParams = string | number

/**
 * Behelyettesíti megodott path parameket az adott url-be.
 * @param url     - Az eredeti placeholderekkel tűzdelt url.
 * @param params  - A behelyettesítendő értékek.
 */
export default function makeUrl (url: string, params: TParams[]): string {
  const splitted = url.split('/')

  const init: {
    parts: string[]
    values: TParams[]
  } = {
    parts: [],
    values: params
  }

  const { parts } = splitted.reduce((acc, curr) => {
    if (!curr.startsWith(':')) {
      acc.parts.push(curr)

      return acc
    }

    if (acc.values.length === 0) {
      return acc
    }

    const [ firstEl, ...rest ] = acc.values

    acc.parts.push(`${ firstEl }`)
    acc.values = rest

    return acc
  }, init)

  return parts.join('/')
}
