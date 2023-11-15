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
    onCustomerOpen,
    onCustomerDelete,

    onSuccessOccured
  } from '../../store'

  import type { TCustomers, TFormErrors } from '../../definitions'

  import CustomerForm     from '../CustomerForm/CustomerForm.svelte'
  import CustomerTableRow from '../CustomerTableRow/CustomerTableRow.svelte'

  const TABLE_HEADERS = [
    'Név',
    'E-mail cím',
    'Telefonszám',
    'Felvétel dátuma',
    'Műveletek'
  ]

  let currentlyDisplayed: 'data' | 'form' = 'data'

  let needToShowPasswordFields = false

  let name: string
  let email: string
  let password: string
  let passwordRepeat: string
  let telephone: string

  let idToEdit: number | null = null

  let idToDelete: number | null = null
  let isConfirmModalOpened      = false

  $: isConfirmModalOpened = Boolean(idToDelete)

  let data: TCustomers = []

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
    telephone       = ''
  }

  /** Egy felhasználó megnyitását figyelő eseménykezelő. */
  const unsubscribeOnOpen = onCustomerOpen.subscribe(async (v) => {
    if (!v) {
      return
    }

    const customer = await ajax.getCustomerById(v)

    if (!customer) {
      return
    }

    name      = customer.name
    email     = customer.email
    telephone = customer.telephone

    idToEdit = v

    currentlyDisplayed = 'form'
  })

  /** Egy felhasználó törlését figyelő eseménykezelő. */
  const unsubscribeOnDelete = onCustomerDelete.subscribe((v) => {
    if (!v) {
      return
    }

    idToDelete = v
  })

  /** Adatok lekérdezése szervertől. */
  async function getData (): Promise<void> {
    data = await ajax.getCustomers()
  }

  /** Új felhasználó felvétele gomb eseménykezelője. */
  function onClickAddNewUser (): void {
    currentlyDisplayed        = 'form'
    needToShowPasswordFields  = true
  }

  /** Sikeres művelet kezlő. */
  function handleSuccess (): void {
    onSuccessOccured.set('Sikeres művelet!')

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
      const res = await ajax.updateCustomer(idToEdit, {
        email,
        name,
        telephone: telephone
      })

      formErrors = res ? res.formErrors ?? [] : []

      if (formErrors.length === 0) {
        handleSuccess()

        await getData()
      }

      return
    }

    const res = await ajax.insertCustomer({
      email,
      name,
      password,
      passwordRepeat,
      telephone: telephone
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
  title="Biztosan törölni szeretnéd a felhasználót?"
/>

<DashboardCard pageTitle="Felhasználók">
  <div slot="content">
    <div class="col-sm-12 text-end">
      {#if currentlyDisplayed === 'data'}
        <Button
          btnType="button"
          className="btn-primary"
          onClick={ onClickAddNewUser }
        >
          Új felhasználó felvétele
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
      <CustomerForm
        bind:name
        bind:email
        bind:password
        bind:telephone
        bind:passwordRepeat
        bind:formErrors
        onSubmit={ handleOnFormSubmit }
        withPassword={ needToShowPasswordFields }
      />
    {:else}
      <Table
        bind:data
        headers={ TABLE_HEADERS }
        rowComponent={ CustomerTableRow }
      />
    {/if}
  </div>
</DashboardCard>
