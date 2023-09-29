import matcher from '../matcher'

interface ITestCase {
  readonly name: string
  readonly method: string | undefined
  readonly isMatching: boolean
}

type TTestingTable = readonly ITestCase[]

describe('matcher', () => {
  beforeEach(jest.resetAllMocks)

  const tt: TTestingTable = [
    {
      name: 'Ha valamiért nincs metódus a kontextusban, akkor `false`.',
      method: undefined,
      isMatching: false
    },
    {
      name: 'Ha nem olyan metódus aminek van body-ja, akkor `false`.',
      method: 'get',
      isMatching: false
    },
    {
      name: 'Ha olyan metódus aminek van body-ja, akkor `true`.',
      method: 'post',
      isMatching: true
    }
  ]

  test.each(tt)('$name', (tc) => {
    const ctx: any = {
      getMethod: (): string | undefined => tc.method
    }

    const isMatching = matcher(ctx)

    expect(isMatching).toBe(tc.isMatching)
  })
})
