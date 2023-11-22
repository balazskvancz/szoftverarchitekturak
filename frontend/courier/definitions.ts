export {
  LOGIN_HASH_COOKIE_NAME
} from '@common/definitions'

export type {
  IUser,
  TJobResult,
  TFormErrors,
  ICurrentJob,
  ICourierCalendarDay,
  TCourierCalendarWeek
} from '@common/definitions'

export const PAGES = [
  'packages', 'settings', 'calendar'
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
  calendar: {
    displayName: 'Naptár',
    icon: 'bi bi-calendar-date',
    url: '/naptar'
  },
  settings: {
    displayName: 'Beállítások',
    icon: 'bi bi-person-fill-gear',
    url: '/beallitasok'
  }

}

export interface IDayStateChange {
  readonly date: string
  readonly isSelected: boolean
}
