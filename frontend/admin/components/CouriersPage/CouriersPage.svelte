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
    onCourierOpen,
    onCourierDelete,

    onSuccessOccured
  } from '../../store'

  import type { TCouriers, TFormErrors } from '../../definitions'

  import CourierForm      from '../CourierForm/CourierForm.svelte'
  import CourierTableRow  from '../CourierTableRow/CourierTableRow.svelte'

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

  let data: TCouriers = []

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

  /** Egy futár megnyitását figyelő eseménykezelő. */
  const unsubscribeOnOpen = onCourierOpen.subscribe(async (v) => {
    if (!v) {
      return
    }

    const courier = await ajax.getCourierById(v)

    if (!courier) {
      return
    }

    name      = courier.name
    email     = courier.email
    telephone = courier.telephone

    idToEdit = v

    currentlyDisplayed = 'form'
  })

  /** Egy futár törlését figyelő eseménykezelő. */
  const unsubscribeOnDelete = onCourierDelete.subscribe((v) => {
    if (!v) {
      return
    }

    idToDelete = v
  })

  /** Adatok lekérdezése szervertől. */
  async function getData (): Promise<void> {
    data = await ajax.getCouriers()
  }

  /** Új futár felvétele gomb eseménykezelője. */
  function onClickAddNewCourier (): void {
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
      const res = await ajax.updateCourier(idToEdit, {
        email,
        name,
        telephone
      })

      formErrors = res ? res.formErrors ?? [] : []

      if (formErrors.length === 0) {
        handleSuccess()

        await getData()
      }

      return
    }

    const res = await ajax.insertCourier({
      email,
      name,
      password,
      passwordRepeat,
      telephone
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
  title="Biztosan törölni szeretnéd a futárt?"
/>

<DashboardCard pageTitle="Felhasználók">
  <div slot="content">
    <div class="col-sm-12 text-end">
      {#if currentlyDisplayed === 'data'}
        <Button
          btnType="button"
          className="btn-primary"
          onClick={ onClickAddNewCourier }
        >
          Új futár felvétele
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
      <CourierForm
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
        rowComponent={ CourierTableRow }
      />
    {/if}
  </div>
</DashboardCard>
