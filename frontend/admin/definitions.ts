export type {
  IAdmin,
  TAdmins,
  ICourier,
  ICustomer,
  TCouriers,
  TCustomers,
  IDimension,
  TDimensions,
  TFormErrors,
  IBaseDimension,
  IInsertUserRequest
} from '@common/definitions'

export {
  LOGIN_HASH_COOKIE_NAME
} from '@common/definitions'

export const PAGES = [
  'dimensions', 'admins', 'couriers', 'customers'
] as const

export type TPage = typeof PAGES[number]

export interface IPage {
  readonly url: string
  readonly displayName: string
  readonly icon: string
}

export const PAGE_LINKS: Record<TPage, IPage> = {
  dimensions: {
    displayName: 'Csomag dimenziók',
    url: '/dimenziok',
    icon: 'bi bi-bounding-box-circles'
  },
  admins: {
    displayName: 'Adminok',
    url: '/adminok',
    icon: 'bi bi-people-fill'
  },
  couriers: {
    displayName: 'Futárok',
    url: '/futarok',
    icon: 'bi bi-boxes'
  },
  customers: {
    displayName: 'Felhasználók',
    url: '/felhasznalok',
    icon: 'bi bi-person-vcard'

  }
}
