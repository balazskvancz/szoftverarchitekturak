const mockServices = {
  sessions: {
    setEndedAt: jest.fn()
  }
}

import Error from '@authService/Error'

import logout from '../logout'

interface ITestCase {
  readonly name: string
  readonly postData: TAnyObject | undefined
  readonly expectedSetEndedatCalledTimes: number
  readonly expectedError: TAnyObject | null
}

type TTestingTable = readonly ITestCase[]

describe('logout', () => {
  beforeEach(jest.resetAllMocks)

  const tt: TTestingTable = [
    {
      name: 'A függvény hibát dob, ha undefined a postData.',
      postData: undefined,
      expectedSetEndedatCalledTimes: 0,
      expectedError: {
        code: Error.codes.ERR_MISSING_BODY,
        message: Error.messages.ERR_MISSING_BODY
      }
    },
    {
      name: 'A függvény hibát dob, ha üres a postData.',
      postData: {},
      expectedSetEndedatCalledTimes: 0,
      expectedError: {
        code: Error.codes.ERR_MISSING_LOGIN_HASH,
        message: Error.messages.ERR_MISSING_LOGIN_HASH
      }
    },
    {
      name: 'A függvény hibát dob, ha nem találja a `loginHash` mezőt.',
      postData: {
        foo: 'bar'
      },
      expectedSetEndedatCalledTimes: 0,
      expectedError: {
        code: Error.codes.ERR_MISSING_LOGIN_HASH,
        message: Error.messages.ERR_MISSING_LOGIN_HASH
      }
    },
    {
      name: 'A függvény hibát dob, ha a `loginHash` értéke `NULL`.',
      postData: {
        loginHash: null
      },
      expectedSetEndedatCalledTimes: 0,
      expectedError: {
        code: Error.codes.ERR_MISSING_LOGIN_HASH,
        message: Error.messages.ERR_MISSING_LOGIN_HASH
      }
    },
    {
      name: 'A függvény hibát dob, ha a `loginHash` értéke szám.',
      postData: {
        loginHash: 42
      },
      expectedSetEndedatCalledTimes: 0,
      expectedError: {
        code: Error.codes.ERR_MISSING_LOGIN_HASH,
        message: Error.messages.ERR_MISSING_LOGIN_HASH
      }
    },
    {
      name: 'A függvény hibát dob, ha a `loginHash` értéke üres string.',
      postData: {
        loginHash: ''
      },
      expectedSetEndedatCalledTimes: 0,
      expectedError: {
        code: Error.codes.ERR_MISSING_LOGIN_HASH,
        message: Error.messages.ERR_MISSING_LOGIN_HASH
      }
    },
    {
      name: 'A függvény hiba nélkül visszatér, ha sikerült a validáció.',
      postData: {
        loginHash: 'string'
      },
      expectedSetEndedatCalledTimes: 1,
      expectedError: null
    }
  ]

  test.each(tt)('$name', async ({ postData, expectedError, expectedSetEndedatCalledTimes }) => {
    const context = {
      getBody: () => postData,

      sendError: jest.fn(),
      sendOk: jest.fn()
    }

    // mockServices.sessions.setEndedAt.mockResolvedValueOnce('mi kéne ide?') // [Balázs]: Semmi.

    const fn = logout(mockServices as any)

    await fn(context as any)

    expect(mockServices.sessions.setEndedAt).toHaveBeenCalledTimes(expectedSetEndedatCalledTimes)

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
