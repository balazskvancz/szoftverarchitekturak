<script
  lang="ts"
  strictEvents
>
  import { onMount  } from 'svelte'

  import type { TFormErrors } from '@common/definitions'

  import Button         from '@common/components/Button/Button.svelte'
  import DashboardCard  from '@common/components/DashboardCard/DashboardCard.svelte'
  import Table          from '@common/components/Table/Table.svelte'

  import type { TDimensions } from '../../definitions'

  import DimensionForm      from '../DimensionForm/DimensionForm.svelte'
  import DimensionTableRow  from '../DimensionTableRow/DimensionTableRow.svelte'

  let currentlyDisplayed: 'data' | 'form' = 'data'

  let height: string
  let width: string
  let depth: string

  let formErrors: TFormErrors = []

  let data: TDimensions = []

  const TABLE_HEADERS = [
    'Azonosító',
    'Méret',
    'Felvétel dátuma',
    'Műveletek'
  ]

  /** Új dimenzió felvétele gomb eseménkezelője. */
  function onClickNewDimension (): void {
    currentlyDisplayed = 'form'
  }

  /** Alaphelyzetbe állítás. */
  function reset (): void {
    height = ''
    width  = ''
    depth  = ''

    formErrors = []

    currentlyDisplayed = 'data'
  }

  /**
   * Form elsütésének kezelője.
   * @param e - A kiváltó esemény.
   */
  async function onSubmit (e: Event): Promise<void> {
    e.preventDefault()

    await Promise.resolve()
  }

  onMount(async () => {
    // TODO: ide API lekérdezés.
    await Promise.resolve()

    data = []
  })

</script>

<DashboardCard pageTitle="Csomag dimenziók">
  <div slot="content">
    <div class="col-sm-12 text-end">
      {#if currentlyDisplayed === 'data'}
        <Button
          btnType="button"
          className="btn-primary"
          onClick={ onClickNewDimension }
        >
          Új dimenzió felvétele
        </Button>
      {:else}
        <Button
          btnType="button"
          className="btn-primary"
          onClick={ reset }
        >
          Visszalépés
        </Button>

      {/if}

      <hr class="my-3" />
    </div>

    {#if currentlyDisplayed === 'form'}
      <DimensionForm
        bind:height
        bind:depth
        bind:width
        bind:formErrors
        { onSubmit }
      />
    {:else}
      <Table
        bind:data
        headers={ TABLE_HEADERS }
        rowComponent={ DimensionTableRow }

      />
    {/if}
  </div>
</DashboardCard>
