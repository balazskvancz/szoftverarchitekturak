export const PAGES = [
  'users', 'dimensions'
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
  users: {
    displayName: 'Felhasználók',
    url: '/felhasznalok',
    icon: 'bi bi-people-fill'
  }
}

export type {
  IDimension,
  TDimensions,
  IBaseDimension
} from '@common/definitions'
