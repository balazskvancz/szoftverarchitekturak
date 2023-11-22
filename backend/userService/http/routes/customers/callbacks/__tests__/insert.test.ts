const mockServices = {
  users: {
    insert: jest.fn(),
    getByEmailAddress: jest.fn()
  },
  customers: {
    insert: jest.fn()
  }
}

const mockValidateInsert = jest.fn()
const mockCreatePassword = jest.fn()

jest.mock('../../../utils/validateInsert', () => mockValidateInsert)
jest.mock('@common/utils/createHash', () => mockCreatePassword)

import Error from '@backend/userService/Error'

import insert from '../insert'

interface ITestCase {
  readonly name: string
  readonly postData: TAnyObject | undefined
  readonly mockValidation: TAnyObject[]
  readonly insertedId: number
  readonly mockEmailValidation: TAnyObject[] | null
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
      mockEmailValidation: [],
      expectedError: {
        code: Error.codes.ERR_MISSING_BODY,
        message: Error.messages.ERR_MISSING_BODY
      }
    },
    {
      name: 'A függvény hibát dob, ha nem megy át a validáláson.',
      postData: {},
      mockValidation: [],
      insertedId: 0,
      mockEmailValidation: [],
      expectedError: {
        code: Error.codes.ERR_WRONG_POSTDATA,
        formErrors: [
          {
            key: 'telephone',
            message: 'Telefonszám megadása kötelező'
          }
        ]
      }
    },
    {
      name: 'A függvény hibát dob, ha foglalt az email cím.',
      postData: {
        telephone: '0123'
      },
      mockValidation: [],
      insertedId: 0,
      mockEmailValidation: [],
      expectedError: {
        code: Error.codes.ERR_WRONG_POSTDATA,
        formErrors: [
          {
            key: 'email',
            message: 'Az e-mail cím már használatban van!'
          }
        ]
      }
    },
    {
      name: 'A függvény hibát dob, ha nem sikerült beszúrni az adatbázisba.',
      postData: {
        telephone: '0123'
      },
      mockValidation: [],
      insertedId: 0,
      mockEmailValidation: null,
      expectedError: {
        code: Error.codes.ERR_DB_INSERT,
        message: Error.messages.ERR_DB_INSERT
      }
    },
    {
      name: 'A függvény hiba nélkül visszatér, ha sikerült beszúrni az adatbázisba.',
      postData: {
        telephone: '0123'
      },
      mockValidation: [],
      insertedId: 1,
      mockEmailValidation: null,
      expectedError: null
    }
  ]

  test.each(tt)('$name', async ({ expectedError, insertedId, mockEmailValidation, mockValidation, postData }) => {
    const context = {
      getBody: () => postData,

      sendError: jest.fn(),
      sendOk: jest.fn()
    }

    mockValidateInsert.mockReturnValueOnce(mockValidation)
    mockServices.users.getByEmailAddress.mockResolvedValueOnce(mockEmailValidation)
    mockServices.users.insert.mockResolvedValueOnce(insertedId)
    mockCreatePassword.mockReturnValueOnce('greatPassword')
    mockServices.customers.insert.mockResolvedValueOnce(true)

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
