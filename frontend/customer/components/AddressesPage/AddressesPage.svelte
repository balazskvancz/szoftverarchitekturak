<script
  lang="ts"
  strictEvents
>
  import { onMount } from 'svelte'

  import Button         from '@common/components/Button/Button.svelte'
  import DashboardCard  from '@common/components/DashboardCard/DashboardCard.svelte'
  import Table          from '@common/components/Table/Table.svelte'

  import type { TAddresses, TFormErrors } from '../../definitions'

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

  function reset (): void {
    country     = ''
    postalCode  = ''
    city        = ''
    street      = ''
    house       = ''
    formErrors  = []

    currentlyDisplayed = 'data'
  }

  /**
   * Form eseménykezelője.
   * @param e - A kiváltó esemény.
   */
  async function onSubmitForm (e: Event): Promise<void> {
    e.preventDefault()

    await Promise.resolve()
  }

  onMount(async () => {
    data = await ajax.getAddresses()
  })

</script>

<DashboardCard pageTitle="Címek">
  <div slot="content">
    <div class="row">
      <div class="cols-sm-12 col-md-6 text-lg-end">
        {#if currentlyDisplayed === 'data'}
          <Button
            btnType="button"
            className="secondary"
            onClick={ () => {
              currentlyDisplayed = 'form'
            } }
          >
            Új cím felvétele
          </Button>

        {:else}
          <Button
            btnType="button"
            className="secondary"
            onClick={ reset }
          >
            Visszalépés
          </Button>
        {/if}
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
