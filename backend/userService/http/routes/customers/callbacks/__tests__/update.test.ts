const mockServices = {
  users: {
    update: jest.fn(),
    getByEmailAddress: jest.fn()
  },
  customers: {
    update: jest.fn(),
    getById: jest.fn()
  }
}

const mockValidateUpdate = jest.fn()

jest.mock('../utils/validateUpdate', () => mockValidateUpdate)

import Error from '@backend/userService/Error'

import update from '../update'

interface ITestCase {
  readonly name: string
  readonly getParams: TAnyObject
  readonly mockAuthorizedUser: TAnyObject | undefined
  readonly postData: TAnyObject | undefined
  readonly mockValidation: TAnyObject[]
  readonly mockEmailValidation: TAnyObject[] | null
  readonly mockGetUser: TAnyObject | null
  readonly mockUpdateResult: boolean
  readonly expectedError: TAnyObject | null
}

type TTestingTable = readonly ITestCase[]

describe('update', () => {
  beforeEach(jest.resetAllMocks)

  const tt: TTestingTable = [
    {
      name: 'A függvény hibát dob, ha üres params.',
      getParams: {},
      mockAuthorizedUser: [],
      postData: {},
      mockValidation: [],
      mockEmailValidation: [],
      mockGetUser: null,
      mockUpdateResult: false,
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
      mockAuthorizedUser: [],
      postData: {},
      mockValidation: [],
      mockEmailValidation: [],
      mockGetUser: null,
      mockUpdateResult: false,
      expectedError: {
        code: Error.codes.ERR_WRONG_PARAM,
        message: Error.messages.ERR_WRONG_PARAM
      }
    },
    {
      name: 'A függvény hibát dob, ha hiányzik a felhasználó hitelesítése.',
      getParams: {
        id: 1
      },
      mockAuthorizedUser: undefined,
      postData: [],
      mockValidation: [],
      mockEmailValidation: [],
      mockGetUser: null,
      mockUpdateResult: true,
      expectedError: {
        code: Error.codes.ERR_USER_NOT_AUTHENTICATED,
        message: Error.messages.ERR_USER_NOT_AUTHENTICATED
      }
    },
    {
      name: 'A függvény hibát dob, ha undefined a postData..',
      getParams: {
        id: 1
      },
      mockAuthorizedUser: [],
      postData: undefined,
      mockValidation: [],
      mockEmailValidation: [],
      mockGetUser: null,
      mockUpdateResult: true,
      expectedError: {
        code: Error.codes.ERR_MISSING_BODY,
        message: Error.messages.ERR_MISSING_BODY
      }
    },
    {
      name: 'A függvény hibát dob, ha nem megy át a validáláson.',
      getParams: {
        id: 1
      },
      mockAuthorizedUser: [],
      postData: {},
      mockValidation: [
        {
          key: 'foo',
          messsage: 'bar'
        }
      ],
      mockEmailValidation: [],
      mockGetUser: null,
      mockUpdateResult: true,
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
      name: 'A függvény hibát dob, ha a keresett egyed nem létezik.',
      getParams: {
        id: 1
      },
      mockAuthorizedUser: [],
      postData: {},
      mockValidation: [],
      mockEmailValidation: [],
      mockGetUser: null,
      mockUpdateResult: true,
      expectedError: {
        code: Error.codes.ERR_USER_NOT_EXISTS,
        message: Error.messages.ERR_USER_NOT_EXISTS
      }
    },
    {
      name: 'A függvény hibát dob, ha felhasználó nem admin.',
      getParams: {
        id: 1
      },
      mockAuthorizedUser: {
        id: 1,
        role: 'customer'
      },
      postData: [],
      mockValidation: [],
      mockEmailValidation: null,
      mockGetUser: {},
      mockUpdateResult: true,
      expectedError: {
        code: Error.codes.ERR_MISSING_PERMISSON,
        message: Error.messages.ERR_MISSING_PERMISSON
      }
    },
    {
      name: 'A függvény hibát dob, ha felhasználó nem saját magán módosítana.',
      getParams: {
        id: 1
      },
      mockAuthorizedUser: {
        id: 1,
        role: 'customer'
      },
      postData: [],
      mockValidation: [],
      mockEmailValidation: [],
      mockGetUser: {
        id: 2,
        role: 'customer'
      },
      mockUpdateResult: true,
      expectedError: {
        code: Error.codes.ERR_MISSING_PERMISSON,
        message: Error.messages.ERR_MISSING_PERMISSON
      }
    },
    {
      name: 'A függvény hibát dob, ha email változtatásnál foglalt az email.',
      getParams: {
        id: 1
      },
      mockAuthorizedUser: {
        role: 'admin'
      },
      postData: {
        email: 'newPass'
      },
      mockValidation: [],
      mockEmailValidation: [],
      mockGetUser: {},
      mockUpdateResult: false,
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
      name: 'A függvény hibát dob, ha az update sikertelen volt.',
      getParams: {
        id: 1
      },
      mockAuthorizedUser: {
        role: 'admin'
      },
      postData: {},
      mockValidation: [],
      mockEmailValidation: [],
      mockGetUser: {},
      mockUpdateResult: false,
      expectedError: {
        code: Error.codes.ERR_DB_UPDATE,
        message: Error.messages.ERR_DB_UPDATE
      }
    },
    {
      name: 'A függvény hiba nélkül visszatér, ha az update sikeres volt.',
      getParams: {
        id: 1
      },
      mockAuthorizedUser: {
        role: 'admin'
      },
      postData: {},
      mockValidation: [],
      mockEmailValidation: [],
      mockGetUser: {},
      mockUpdateResult: true,
      expectedError: null
    }
  ]

  test.each(tt)('$name', async ({ expectedError, mockUpdateResult, mockGetUser, mockEmailValidation, mockValidation, postData, mockAuthorizedUser, getParams }) => {
    const context = {
      getRouteParams: () => getParams,
      getBody: () => postData,
      getBindedValue: () => mockAuthorizedUser,

      sendError: jest.fn(),
      sendOk: jest.fn()
    }

    mockValidateUpdate.mockReturnValueOnce(mockValidation)
    mockServices.customers.getById.mockResolvedValueOnce(mockGetUser)
    mockServices.users.getByEmailAddress.mockResolvedValueOnce(mockEmailValidation)
    mockServices.users.update.mockResolvedValueOnce(mockUpdateResult)
    mockServices.customers.update.mockResolvedValueOnce(true)

    const fn = update(mockServices as any)

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
