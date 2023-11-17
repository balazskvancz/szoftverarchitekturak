export type TState = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link'

export interface ISelectValue {
  readonly value: string
  readonly text: string
}

export type TSelectValues = readonly ISelectValue[]
