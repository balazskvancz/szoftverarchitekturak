const mockServices = {
  addresses: {
    getById: jest.fn()
  }
}

import Error from '@backend/packageService/Error'

import getById from '../getById'

interface ITestCase {
  readonly name: string
  readonly getParams: TAnyObject
  readonly mockGetById: TAnyObject | null
  readonly expectedError: TAnyObject | null
}

type TTestingTable = readonly ITestCase[]

// A konkrét típus és a benne lévő
// adat nem igazán érdekel minket.
// Csak control-flow-t tesztelünk.
const MOCK_ADDRESS = {
  id: 1
}

describe('getById', () => {
  beforeEach(jest.resetAllMocks)

  const tt: TTestingTable = [
    {
      name: 'A függvény hibát dob, ha üres params.',
      getParams: {},
      mockGetById: null,
      expectedError: {
        code: Error.codes.ERR_WRONG_PARAM,
        message: Error.messages.ERR_WRONG_PARAM
      }
    },
    {
      name: 'A függvény hibát dob, ha nem szám az `id` a paramsban.',
      getParams: {
        id: 'mock-bad-id'
      },
      mockGetById: null,
      expectedError: {
        code: Error.codes.ERR_WRONG_PARAM,
        message: Error.messages.ERR_WRONG_PARAM
      }
    },
    {
      name: 'A függvény `null`-t ad vissza, ha a keresett egyed nem található.',
      getParams: {
        id: 1
      },
      mockGetById: null,
      expectedError: null
    },
    {
      name: 'A függvény visszaadja a keresett egyedet.',
      getParams: {
        id: 1
      },
      mockGetById: MOCK_ADDRESS,
      expectedError: null
    }
  ]

  test.each(tt)('$name', async ({ expectedError, mockGetById, getParams }) => {
    const mockContext = {
      getRouteParams: () => getParams,

      sendError: jest.fn(),
      sendJson: jest.fn()
    }

    mockServices.addresses.getById.mockResolvedValueOnce(mockGetById)

    const fn = getById(mockServices as any)

    await fn(mockContext as any)

    if (expectedError) {
      expect(mockContext.sendError).toHaveBeenCalledOnce()
      expect(mockContext.sendError.mock.calls[0][0]).toStrictEqual(expectedError)

      expect(mockContext.sendJson).not.toHaveBeenCalled()

      return
    }

    const expectedJson = {
      address: mockGetById
    }

    expect(mockContext.sendJson).toHaveBeenCalledOnce()
    expect(mockContext.sendJson.mock.calls[0][0]).toStrictEqual(expectedJson)

    expect(mockContext.sendError).not.toHaveBeenCalled()
  })
})
