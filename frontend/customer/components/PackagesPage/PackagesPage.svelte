<script
  lang="ts"
  strictEvents
>
  import { onMount } from 'svelte'

  import Button         from '@common/components/Button/Button.svelte'
  import DashboardCard  from '@common/components/DashboardCard/DashboardCard.svelte'

  import ajax from '../../ajax'

  import { onSuccessOccured } from '../../store'

  import PackageForm from '../PackageForm/PackageForm.svelte'

  import type { TAddresses, TDimensions, TFormErrors } from '../../definitions'

  let currentlyDisplayed: 'data' | 'form' = 'data'

  let addresses: TAddresses   = []
  let dimensions: TDimensions = []

  let country: string
  let postalCode: string
  let city: string
  let street: string
  let house: string

  let weight: string
  let selectedAddress: string
  let selectedDimension: string

  let formErrors: TFormErrors = []

  /** Visszaállítátó függvény.*/
  function reset (): void {
    currentlyDisplayed = 'data'

    country     = ''
    postalCode  = ''
    city        = ''
    street      = ''
    house       = ''
    weight      = ''

    selectedAddress   = ''
    selectedDimension = ''

    formErrors = []
  }

  /** Sikeres művelet kezelője. */
  function handleSuccess (): void {
    onSuccessOccured.set('Sikeres művelet!')

    reset()
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
        userId: -1
      },
      dimensionId:      Number(selectedDimension),
      pickUpAddressId:  Number(selectedAddress),
      weight:           Number(weight)
    })

    formErrors = res ? res.formErrors ?? [] : []

    if (formErrors.length === 0) {
      handleSuccess()

    // await getData()
    }
  }

  onMount(async () => {
    addresses   = await ajax.getAddresses()
    dimensions  = await ajax.getDimensions()
  })
</script>

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
          bind:selectedAddress
          bind:selectedDimension
          onSubmit={ handleOnFormSubmit }
        />
      </div>
    </div>

  </div>
</DashboardCard>
