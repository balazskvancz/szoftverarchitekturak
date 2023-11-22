const mockServices = {
    sessions: {
      setEndedAt: jest.fn()
    }
  }

import Error from '@authService/Error'

import login from '../login'

interface ITestCase {
    readonly name: string
    readonly postData: TAnyObject | undefined
    readonly expectedSetEndedatCalledTimes: number
    readonly expectedError: TAnyObject | null
  }

type TTestingTable = readonly ITestCase[]


jest.mock('@backend/Communicator/Communicator', () => ({
    __esModule: true,
    default: {
        getIdByEmailPass: () => new Promise((resolve) => {
            resolve({id: 1, createdAt: ""})
        })
    },
}));

describe("login", ()=>{
    beforeEach(jest.resetAllMocks)

    const tt: TTestingTable = [
        {
          name: 'A függvény hiba nélkül visszatér, ha sikerült a validáció.',
          postData: {
            email: 'string',
            password: 'string'
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



        const fn = login(mockServices as any)

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