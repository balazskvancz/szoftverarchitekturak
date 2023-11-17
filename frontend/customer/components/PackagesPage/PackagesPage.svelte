<script
  lang="ts"
  strictEvents
>
  import { onMount, onDestroy } from 'svelte'

  import Button         from '@common/components/Button/Button.svelte'
  import DashboardCard  from '@common/components/DashboardCard/DashboardCard.svelte'
  import Table          from '@common/components/Table/Table.svelte'

  import ajax from '../../ajax'

  import {
    onSuccessOccured,
    onOpenHistoryModal
  } from '../../store'

  import LifeCycleModal   from '../LifeCycleModal/LifeCycleModal.svelte'
  import PackageForm      from '../PackageForm/PackageForm.svelte'
  import PackageTableRow  from '../PackageTableRow/PackageTableRow.svelte'

  import type {
    TAddresses,
    TDimensions,
    TFormErrors,
    TDigestPackages,
    TPackageLifeCycles
  } from '../../definitions'

  const TABLE_HEADERS = [
    'Csomag dimenzió',
    'Címzett',
    'Címzett adatai',
    'Állapot'
  ]

  let currentlyDisplayed: 'data' | 'form' = 'data'

  let data: TDigestPackages   = []
  let addresses: TAddresses   = []
  let dimensions: TDimensions = []

  let country: string
  let postalCode: string
  let city: string
  let street: string
  let house: string

  let weight: string
  let receiverEmail: string
  let receiverName: string

  let selectedAddress: string
  let selectedDimension: string

  let formErrors: TFormErrors = []

  let packageLifeCycles: TPackageLifeCycles = []
  let isHistoryModalOpened = false

  /** Korábbi eseményeket megjelenítő modal megnyitása gomb eseménykezelője. */
  const unsubscribeOnOpenHistoryModal = onOpenHistoryModal.subscribe(async (v) => {
    if (!v) {
      return
    }

    packageLifeCycles     = await ajax.getPackageLifeCycles(v)
    isHistoryModalOpened  = true
  })

  /** Visszaállítátó függvény.*/
  function reset (): void {
    currentlyDisplayed = 'data'

    country       = ''
    postalCode    = ''
    city          = ''
    street        = ''
    house         = ''
    weight        = ''
    receiverEmail = ''
    receiverName  = ''

    selectedAddress   = ''
    selectedDimension = ''

    formErrors = []
  }

  /** Sikeres művelet kezelője. */
  function handleSuccess (): void {
    onSuccessOccured.set('Sikeres művelet!')

    reset()
  }

  /** Bejelentkezett felhasználókhoz tartozó csomagok lekérdezése. */
  async function getData (): Promise<void> {
    data = await ajax.getPackagesByUser()
  }

  /**
   * Form eseménykezelője.
   * @param e - A kiváltó esemény.
   */
  async function handleOnFormSubmit (e: Event): Promise<void> {
    e.preventDefault()

    const res = await ajax.insertPackage({
      dest: {
        city,
        country,
        house,
        postalCode,
        street,
        userId: -1 // Nincs jelentősége.
      },
      dimensionId:      Number(selectedDimension),
      pickUpAddressId:  Number(selectedAddress),
      weight:           Number(weight),
      receiverEmail,
      receiverName
    })

    formErrors = res ? res.formErrors ?? [] : []

    if (formErrors.length === 0) {
      handleSuccess()

      await getData()
    }
  }

  onMount(async () => {
    await getData()

    addresses   = await ajax.getAddresses()
    dimensions  = await ajax.getDimensions()
  })

  onDestroy(() => {
    unsubscribeOnOpenHistoryModal()
  })
</script>

<LifeCycleModal
  bind:data={ packageLifeCycles }
  bind:isOpened={ isHistoryModalOpened }

/>

<DashboardCard pageTitle="Csomagok">
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
            Új csomag küldése
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

        {#if currentlyDisplayed === 'data'}
          <Table
            bind:data
            headers={ TABLE_HEADERS }
            rowComponent={ PackageTableRow }
          />
        {:else}
          <PackageForm
            bind:country
            bind:postalCode
            bind:city
            bind:street
            bind:house
            bind:formErrors
            bind:addresses
            bind:dimensions
            bind:weight
            bind:receiverEmail
            bind:receiverName
            bind:selectedAddress
            bind:selectedDimension
            onSubmit={ handleOnFormSubmit }
          />
        {/if}
      </div>
    </div>

  </div>
</DashboardCard>
