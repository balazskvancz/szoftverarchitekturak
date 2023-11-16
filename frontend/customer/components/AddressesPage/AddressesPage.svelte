<script
  lang="ts"
  strictEvents
>
  import { onMount, onDestroy } from 'svelte'

  import Button         from '@common/components/Button/Button.svelte'
  import ConfirmModal   from '@common/components/ConfirmModal/ConfirmModal.svelte'
  import DashboardCard  from '@common/components/DashboardCard/DashboardCard.svelte'
  import Table          from '@common/components/Table/Table.svelte'

  import type { TAddresses, TFormErrors } from '../../definitions'

  import {
    onDeleteAddress,
    onSuccessOccured
  } from '../../store'

  import ajax from '../../ajax'

  import AddressForm      from '../AddressForm/AddressForm.svelte'
  import AddressTableRow  from '../AddressTableRow/AddressTableRow.svelte'

  const TABLE_HEADERS = [
    'Ország',
    'Irszám, Város',
    'Utca, házszám',
    'Művelet'
  ]

  let currentlyDisplayed: 'data' | 'form' = 'data'

  let country: string
  let postalCode: string
  let city: string
  let street: string
  let house: string
  let formErrors: TFormErrors = []

  let data: TAddresses = []

  let addressIdToDelete: number | null  = null
  let isConfirmModalOpened              = false

  $: isConfirmModalOpened = Boolean(addressIdToDelete)

  function reset (): void {
    country     = ''
    postalCode  = ''
    city        = ''
    street      = ''
    house       = ''
    formErrors  = []

    currentlyDisplayed = 'data'
  }

  /** Sikeres esemény kezelője. */
  function handleSuccess (): void {
    onSuccessOccured.set('Sikeres művelet!')

    reset()
  }

  /** Egy adott cím törlésének eseménykezelője. */
  const unsubcribeOnDelete = onDeleteAddress.subscribe((v) => {
    if (v) {
      addressIdToDelete = v
    }
  })

  /** Adat lekérdezése a szervertől. */
  async function getData (): Promise<void> {
    data = await ajax.getAddresses()
  }

  /**
   * Form eseménykezelője.
   * @param e - A kiváltó esemény.
   */
  async function onSubmitForm (e: Event): Promise<void> {
    e.preventDefault()

    const error = await ajax.insertCustomerAddress({
      city,
      country,
      house,
      postalCode,
      street,

      // Ide nyugodtan mehet -1, úgyis felülcsapja az első szolg.
      userId: -1
    })

    formErrors = error ? error.formErrors ?? [] : []

    if (formErrors.length === 0) {
      handleSuccess()

      await getData()
    }
  }

  /**
   * ConfirmModal visszaigazolás ezelője.
   * @param isConfirmed - Vissza lett-e igazolva.
   */
  async function handleOnCloseConfirmModal (isConfirmed: boolean): Promise<void> {
    const idToDelete = addressIdToDelete ?? 0

    addressIdToDelete = null

    if (!isConfirmed) {
      return
    }

    const res = await ajax.deleteCustomerAddress(idToDelete)

    if (!res) {
      handleSuccess()

      await getData()
    }
  }

  onMount(async () => {
    await getData()
  })

  onDestroy(() => {
    unsubcribeOnDelete()
  })
</script>

<ConfirmModal
  bind:isOpened={ isConfirmModalOpened }
  onClose={ handleOnCloseConfirmModal }
  title="Biztosan törölni szeretnéd a címet?"
/>

<DashboardCard pageTitle="Címek">
  <div slot="content">
    <div class="row">
      <div class="cols-sm-12 text-lg-end">
        {#if currentlyDisplayed === 'data'}
          <Button
            btnType="button"
            className="btn-primary"
            onClick={ () => {
              currentlyDisplayed = 'form'
            } }
          >
            Új cím felvétele
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
    </div>

    {#if currentlyDisplayed === 'data'}
      <Table
        bind:data
        headers={ TABLE_HEADERS }
        rowComponent={ AddressTableRow }
      />
    {:else}
      <AddressForm
        bind:country
        bind:postalCode
        bind:city
        bind:street
        bind:house
        bind:formErrors
        onSubmit={ onSubmitForm }
      />
    {/if}
  </div>
</DashboardCard>
