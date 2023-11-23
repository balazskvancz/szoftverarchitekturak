<script
  lang="ts"
  strictEvents
>
  import { onMount, onDestroy } from 'svelte'

  import Button         from '@common/components/Button/Button.svelte'
  import ConfirmModal   from '@common/components/ConfirmModal/ConfirmModal.svelte'
  import DashboardCard  from '@common/components/DashboardCard/DashboardCard.svelte'
  import Table          from '@common/components/Table/Table.svelte'

  import ajax from '../../ajax'

  import {
    onAdminOpen,
    onAdminDelete,
    onSuccessOccured
  } from '../../store'

  import type { TAdmins, TFormErrors } from '../../definitions'

  import AdminForm      from '../AdminForm/AdminForm.svelte'
  import AdminTableRow  from '../AdminTableRow/AdminTableRow.svelte'

  const TABLE_HEADERS = [
    'Név',
    'E-mail cím',
    'Felvétel dátuma',
    'Műveletek'
  ]

  let currentlyDisplayed: 'data' | 'form' = 'data'

  let needToShowPasswordFields = false

  let name: string
  let email: string
  let password: string
  let passwordRepeat: string

  let idToEdit: number | null = null

  let idToDelete: number | null = null
  let isConfirmModalOpened      = false

  $: isConfirmModalOpened = Boolean(idToDelete)

  let data: TAdmins = []

  let formErrors: TFormErrors = []

  /** Alaphelyzetbe állító függény. */
  function reset (): void {
    currentlyDisplayed  = 'data'
    formErrors          = []

    idToEdit   = null
    idToDelete = null

    needToShowPasswordFields = false

    name            = ''
    email           = ''
    password        = ''
    passwordRepeat  = ''
  }

  /** Egy admin megnyitását figyelő eseménykezelő. */
  const unsubscribeOnOpen = onAdminOpen.subscribe(async (v) => {
    if (!v) {
      return
    }

    const admin = await ajax.getAdminById(v)

    if (!admin) {
      return
    }

    name  = admin.name
    email = admin.email

    idToEdit = v

    currentlyDisplayed = 'form'
  })

  /** Egy admin törlését figyelő eseménykezelő. */
  const unsubscribeOnDelete = onAdminDelete.subscribe((v) => {
    if (!v) {
      return
    }

    idToDelete = v
  })

  /** Adatok lekérdezése szervertől. */
  async function getData (): Promise<void> {
    data = await ajax.getAdmins()
  }

  /** Új admin felvétele gomb eseménykezelője. */
  function onClickAddNewAdmin (): void {
    currentlyDisplayed        = 'form'
    needToShowPasswordFields  = true
  }

  /** Sikeres művelet kezlő. */
  function handleSuccess (): void {
    onSuccessOccured.set('Sikeres művelet!')
    onSuccessOccured.set(null)

    reset()
  }

  /**
   * Megerősítés modal bezárása callback.
   * @param isConfirmed - Jóvá lett-e hagyva.
   */
  async function onConfirmDelete (isConfirmed: boolean): Promise<void> {
    const userId = idToDelete ?? 0

    idToDelete = null

    if (!isConfirmed) {
      return
    }

    const error = await ajax.deleteUser(userId)

    if (!error) {
      handleSuccess()

      await getData()
    }
  }

  /**
   * Form elsütésének kezelője.
   * @param e - A kiváltó esemény.
   */
  async function handleOnFormSubmit (e: Event): Promise<void> {
    e.preventDefault()

    // Ekkor tudjuk, hogy éppen egy adott admint módosítunk.
    if (idToEdit) {
      const res = await ajax.updateAdmin(idToEdit, {
        email,
        name
      })

      formErrors = res ? res.formErrors ?? [] : []

      if (formErrors.length === 0) {
        handleSuccess()

        await getData()
      }

      return
    }

    // Különben pedig beszúrás.,

    const res = await ajax.insertAdmin({
      email,
      name,
      password,
      passwordRepeat
    })

    formErrors = res ? res.formErrors ?? [] : []

    if (formErrors.length === 0) {
      handleSuccess()

      await getData()
    }
  }

  onMount(async () => {
    await getData()
  })

  onDestroy(() => {
    unsubscribeOnOpen()
    unsubscribeOnDelete()
  })
</script>

<ConfirmModal
  bind:isOpened={ isConfirmModalOpened }
  onClose={ onConfirmDelete }
  title="Biztosan törölni szeretnéd az admint?"
/>

<DashboardCard pageTitle="Adminok">
  <div slot="content">
    <div class="col-sm-12 text-end">
      {#if currentlyDisplayed === 'data'}
        <Button
          btnType="button"
          className="btn-primary"
          onClick={ onClickAddNewAdmin }
        >
          Új admin felvétele
        </Button>
      {:else}
        <Button
          btnType="button"
          className="btn-secondary"
          onClick={ reset }
        >
          Visszalépés
        </Button>
      {/if}

      <hr class="my-3" />
    </div>

    {#if currentlyDisplayed === 'form'}
      <AdminForm
        bind:name
        bind:email
        bind:password
        bind:passwordRepeat
        bind:formErrors
        onSubmit={ handleOnFormSubmit }
        withPassword={ needToShowPasswordFields }
      />
    {:else}
      <Table
        bind:data
        headers={ TABLE_HEADERS }
        rowComponent={ AdminTableRow }
      />
    {/if}
  </div>
</DashboardCard>
