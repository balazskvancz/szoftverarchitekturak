const mockServices = {
  sessions: {
    setEndedAt: jest.fn()
  }
}

// valoszinu nem kell mockolni utilsbol mert nincs kiszervezve?
// de a peldaban sincs amugy semmi ertelmes talan bekotve? mire jo ez a lepes?

import Error from '@authService/Error'

import logout from '../logout'

interface ITestCase {
  readonly name: string
  readonly postData: TAnyObject | undefined
  readonly expectedError: TAnyObject | null
}

type TTestingTable = readonly ITestCase[]

describe('logout', () => {
  beforeEach(jest.resetAllMocks)

  const tt: TTestingTable = [
    {
      name: 'A függvény hibát dob, ha undefined a postData',
      postData: undefined,
      expectedError: {
        code: Error.codes.ERR_MISSING_BODY,
        message: 'Hiányzó request body'
      }
    },
    {
      name: 'A függvény hibát dob, ha üres PostDatát kap',
      postData: {},
      expectedError: {
        code: Error.codes.ERR_WRONG_POSTDATA,
        message: 'Hiányzó session azonosító'
      }
    },
    {
      name: 'A függvény hibát dob, ha nem találja a loginHash mezőt',
      postData: {
        foo: 'bar'
      },
      expectedError: {
        code: Error.codes.ERR_WRONG_POSTDATA,
        message: 'Hiányzó session azonosító'
      }
    },
    {
      name: 'A függvény hibát dob, ha a loginHash értéke null',
      postData: {
        loginHash: null
      },
      expectedError: {
        code: Error.codes.ERR_WRONG_POSTDATA,
        message: 'Hiányzó session azonosító'
      }
    },
    {
      name: 'A függvény hibát dob, ha a loginHash értéke number',
      postData: {
        loginHash: 42
      },
      expectedError: {
        code: Error.codes.ERR_WRONG_POSTDATA,
        message: 'Hiányzó session azonosító'
      }
    },
    {
      name: 'A függvény hibát dob, ha a loginHash értéke üres string',
      postData: {
        loginHash: ''
      },
      expectedError: {
        code: Error.codes.ERR_WRONG_POSTDATA,
        message: 'Hiányzó session azonosító'
      }
    },
    {
      name: 'A függvény hiba nélkül visszatér, ha sikerült a validáció',
      postData: {
        loginHash: 'string'
      },
      expectedError: null
    }
  ]

  test.each(tt)('$name', async ({ postData, expectedError }) => {
    const context = {
      getBody: () => postData,

      sendError: jest.fn(),
      sendOk: jest.fn()
    }

    mockServices.sessions.setEndedAt.mockResolvedValueOnce('mi kéne ide?')

    const fn = logout(mockServices as any)

    await fn(context as any)

    if (expectedError) {
      expect(context.sendOk).not.toHaveBeenCalled()

      expect(context.sendError).toHaveBeenCalledOnce()
      expect(context.sendError.mock.calls[0][0]).toStrictEqual(expectedError)

      return
    }

    expect(context.sendError).not.toHaveBeenCalled()
    expect(context.sendOk).toHaveBeenCalledOnce()
  })
})
