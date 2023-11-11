import { writable } from 'svelte/store'

export const onSuccessOccured = writable<string | null>(null)

export const onDimensionOpen    = writable<number | null>(null)
export const onDimensionDelete  = writable<number | null>(null)

export const onAdminOpen    = writable<number | null>(null)
export const onAdminDelete  = writable<number | null>(null)
