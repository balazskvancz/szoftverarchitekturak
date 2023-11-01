export interface ICrossRequestOptions {
  readonly host: string
  readonly port: number
  readonly path: string
  readonly method: string

  readonly headers?: TAnyObject // Egyelőre.
}

export type TMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export const GATEWAY_HOST = 'localhost'
export const GATEWAY_PORT = 3000

/** UserService. */
export {
  EUsersRoute
} from './userService/definitions'

export type {
  IUser,
  IGetUserByIdResponse,
  IGetUserIdByEmailPassResponse
} from './userService/definitions'
