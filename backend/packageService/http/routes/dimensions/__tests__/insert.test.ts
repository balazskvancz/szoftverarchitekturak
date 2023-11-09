const mockServices = {
  dimensions: {
    insert: jest.fn()
  }
}

const mockValidatePostData = jest.fn()

jest.mock('../utils/validatePostData', () => mockValidatePostData)

import Error from '@backend/packageService/Error'

import insert from '../insert'

interface ITestCase {
  readonly name: string
  readonly postData: TAnyObject | undefined
  readonly mockValidation: TAnyObject[]
  readonly insertedId: number
  readonly expectedError: TAnyObject | null
}

type TTestingTable = readonly ITestCase[]

describe('insert', () => {
  beforeEach(jest.resetAllMocks)

  const tt: TTestingTable = [
    {
      name: 'A függvény hibát dob, ha undefined a postData.',
      postData: undefined,
      mockValidation: [],
      insertedId: 0,
      expectedError: {
        code: Error.codes.ERR_WRONG_POSTDATA,
        message: 'Hiányzó postData!'
      }
    },
    {
      name: 'A függvény hibát dob, ha nem megy át a validáláson.',
      postData: {},
      mockValidation: [
        {
          key: 'foo',
          messsage: 'bar'
        }
      ],
      insertedId: 0,
      expectedError: {
        code: Error.codes.ERR_WRONG_POSTDATA,
        formErrors: [
          {
            key: 'foo',
            messsage: 'bar'
          }
        ]
      }
    },
    {
      name: 'A függvény hibát dob, ha nem sikerült beszúrni az adatbázisba.',
      postData: {},
      mockValidation: [],
      insertedId: 0,
      expectedError: {
        code: Error.codes.ERR_DB_INSERT,
        message: Error.messages.ERR_DB_INSERT
      }
    },
    {
      name: 'A függvény hiba nélkül visszatér, ha sikerült beszúrni az adatbázisba.',
      postData: {},
      mockValidation: [],
      insertedId: 1,
      expectedError: null
    }
  ]

  test.each(tt)('$name', async ({ expectedError, insertedId, mockValidation, postData }) => {
    const context = {
      getBody: () => postData,

      sendError: jest.fn(),
      sendOk: jest.fn()
    }

    mockValidatePostData.mockReturnValueOnce(mockValidation)
    mockServices.dimensions.insert.mockResolvedValueOnce(insertedId)

    const fn = insert(mockServices as any)

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
