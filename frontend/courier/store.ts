import { readable, writable } from 'svelte/store'

import type { IUser, IDayStateChange } from './definitions'

export const onLogin            = writable<IUser | null>(null)
export const onSuccessOccured   = writable<string | null>(null)

export const getLoggedInUser = readable<IUser | null>(null, (set) => {
  const _ = onLogin.subscribe((v) => {
    set(v)
  })
})

export const onCalendarDayChange = writable<IDayStateChange | null>(null)
