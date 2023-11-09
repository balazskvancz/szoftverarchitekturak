<script
  lang="ts"
  strictEvents
>
  import { onMount, onDestroy } from 'svelte'

  import type { TFormErrors, IBaseDimension } from '@common/definitions'

  import Button         from '@common/components/Button/Button.svelte'
  import DashboardCard  from '@common/components/DashboardCard/DashboardCard.svelte'
  import Table          from '@common/components/Table/Table.svelte'

  import ajax from '../../ajax'

  import {
    onDimensionOpen,

    onSuccessOccured
  } from '../../store'

  import type { TDimensions } from '../../definitions'

  import DimensionForm      from '../DimensionForm/DimensionForm.svelte'
  import DimensionTableRow  from '../DimensionTableRow/DimensionTableRow.svelte'

  const TABLE_HEADERS = [
    'Azonosító',
    'Méret',
    'Felvétel dátuma',
    'Műveletek'
  ]

  let currentlyDisplayed: 'data' | 'form' = 'data'

  let length: string
  let width: string
  let depth: string

  let formErrors: TFormErrors = []

  let data: TDimensions = []

  let dimensionToEdit: number | null = null

  /** Új dimenzió felvétele gomb eseménkezelője. */
  function onClickNewDimension (): void {
    currentlyDisplayed = 'form'
  }

  /** Alaphelyzetbe állítás. */
  function reset (): void {
    length = ''
    width  = ''
    depth  = ''

    formErrors = []

    currentlyDisplayed  = 'data'
    dimensionToEdit     = null
  }

  /** Sikeres művelet kezelő. */
  function handleSuccess (): void {
    onSuccessOccured.set('Sikeres dimenzió felvétel!')

    reset()
  }

  /** Adatok szervertől való lekérdezése. */
  async function getData (): Promise<void> {
    data = await ajax.getDimensions()
  }

  /** Egy dimenzió megnyitását figyelő eseménykezelő. */
  const unsubscribeOnOpen = onDimensionOpen.subscribe(async (v) => {
    if (!v) {
      return
    }

    onDimensionOpen.set(null)

    const res = await ajax.getDimensionById(v)

    if (res) {
      dimensionToEdit     = v
      currentlyDisplayed  = 'form'

      length = res.length.toString()
      width  = res.width.toString()
      depth  = res.depth.toString()
    }
  })

  /**
   * Form elsütésének kezelője.
   * @param e - A kiváltó esemény.
   */
  async function onSubmit (e: Event): Promise<void> {
    e.preventDefault()

    const data: IBaseDimension = {
      depth:  Number(depth),
      length: Number(length),
      width:  Number(width)
    }

    const error = dimensionToEdit
      ? await ajax.updateDimension(dimensionToEdit, data)
      : await ajax.insertDimension(data)

    formErrors = error ? error.formErrors ?? [] : []

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
        bind:length
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
