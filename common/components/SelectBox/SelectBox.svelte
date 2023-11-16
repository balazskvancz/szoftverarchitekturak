<script
  lang="ts"
  strictEvents
>
  import type {
    TFormErrors
  } from '../../definitions'

  import FormLabel from '../FormLabel/FormLabel.svelte'

  import styles from './SelectBox.css'

  interface ISelectItem {
    readonly value: string
    readonly name: string
  }

  export let items: ISelectItem[]
  export let name: string
  export let selectedValue: string | undefined
  export let label: string | null = null
  export let formErrors: TFormErrors = []
  const defaultValue: ISelectItem = {
    name: 'Kérlek válassz a lehetőségek közül',
    value: ''
  }

  const itemset = [
    defaultValue,
    ...items
  ]

  let isExpanded = false

  let searchValue = ''

  $: itemsToDisplay = searchValue === ''
    ? itemset
    : itemset.filter((e) => e.name.includes(searchValue))

  $: errorMsg = formErrors.find((el) => el.key === name)?.message ?? null
  $: isError  = !errorMsg

  let currentlySelected: ISelectItem = selectedValue
    ? items.find((el) => el.value === selectedValue) ?? defaultValue
    : defaultValue

  /**
   * Egy item-re való kattintás eseménykezelője.
   * @param item - A kiválasztott elem.
   */
  function onClickSelectItem (item: ISelectItem): void {
    isExpanded        = false
    searchValue       = ''
    currentlySelected = item
    selectedValue     = item.value
  }
</script>

<div class={ styles.selectboxContainer }>
  {#if label !== null}
    <FormLabel { label } />
  {/if}
  <div class={ styles.selectedWrapper }>
    <input
      class={ styles.selectboxCurrentlySelected }
      class:border={ isError }
      class:border-danger={ isError }
      on:click={ () => {
        isExpanded = !isExpanded
        searchValue = ''
      } }
      bind:value={ currentlySelected.name }
      readonly
    />
    {#if errorMsg}
      <small class={ styles.errorMessage }><p class="text-danger">{errorMsg}</p></small>
    {/if}

  </div>

  {#if isExpanded}
    <div class={ styles.selectboxOptions }>
      <div class="col p-2">
        <input
          class="form-control shadow-none"
          bind:value={ searchValue }
          placeholder="Keresés"
          type="text"
        />
      </div>

      <div class={ styles.items }>
        {#if itemsToDisplay.length > 0}
          {#each itemsToDisplay as item (item.value)}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div
              class={ `${ styles.itemRow } ${ item.value === currentlySelected.value ? styles.active : '' }` }
              on:click={ () => onClickSelectItem(item) }
            >
              <p>{item.name}</p>
            </div>
          {/each}
        {:else}
          <hr class="my-3" />
          <p>Nincs a keresést kielégítő találat!</p>
        {/if}
      </div>
    </div>
  {/if}
</div>
