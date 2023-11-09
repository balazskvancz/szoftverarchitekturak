import type { IFormError } from '@common/Router/definitions'

import validatePostData from '../validatePostData'

interface ITestCase {
  readonly name: string
  readonly input: TAnyObject
  readonly expected: IFormError[]
}

type TTestingTable = readonly ITestCase[]

const ERROR_MESSAGE = 'A mező értékének pozitív számnak kell lennie!'

describe('validatePostData', () => {
  beforeEach(jest.resetAllMocks)

  const tt: TTestingTable = [
    {
      name: 'A függvény visszaadja az összes lehetséges hibát.',
      input: {},
      expected: [
        {
          key: 'depth',
          message: ERROR_MESSAGE
        },
        {
          key: 'length',
          message: ERROR_MESSAGE
        },
        {
          key: 'width',
          message: ERROR_MESSAGE
        }
      ]
    },
    ...[ '', 'mock-text', -1, false, null, {}, [], undefined ].map((depth) => (
      {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        name: `A függvény hibát dob, ha a 'depth' értéke: ${ depth }.`,
        input: {
          depth
        },
        expected: [
          {
            key: 'depth',
            message: ERROR_MESSAGE
          },
          {
            key: 'length',
            message: ERROR_MESSAGE
          },
          {
            key: 'width',
            message: ERROR_MESSAGE
          }
        ]
      }
    )),
    {
      name: 'A függvény nem dob hibát a `depth`-re.',
      input: {
        depth: 1
      },
      expected: [
        {
          key: 'length',
          message: ERROR_MESSAGE
        },
        {
          key: 'width',
          message: ERROR_MESSAGE
        }
      ]
    },
    {
      name: 'A függvény nem dob semmilyen hibát.',
      input: {
        depth: 1,
        length: 1,
        width: 1
      },
      expected: []
    }
  ]

  test.each(tt)('$name', ({ expected, input }) => {
    const got = validatePostData(input as any)

    expect(got).toStrictEqual(expected)
  })
})
