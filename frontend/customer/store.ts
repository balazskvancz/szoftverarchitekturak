import { writable } from 'svelte/store'

export const onSuccessOccured = writable<string | null>(null)

export const onDeleteAddress = writable<number | null>(null)

export const onOpenHistoryModal = writable<number | null>(null)
