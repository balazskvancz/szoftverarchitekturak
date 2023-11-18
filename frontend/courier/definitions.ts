export {
  LOGIN_HASH_COOKIE_NAME
} from '@common/definitions'

export type {
  IUser,
  TFormErrors
} from '@common/definitions'

export const PAGES = [
  'packages', 'settings'
] as const

export type TPage = typeof PAGES[number]

export interface IPage {
  readonly url: string
  readonly displayName: string
  readonly icon: string
}

export const PAGE_LINKS: Record<TPage, IPage> = {
  packages: {
    displayName: 'Csomagok',
    icon: 'bi bi-boxes',
    url: '/csomagok'
  },
  settings: {
    displayName: 'Beállítások',
    icon: 'bi bi-person-fill-gear',
    url: '/beallitasok'
  }
}
