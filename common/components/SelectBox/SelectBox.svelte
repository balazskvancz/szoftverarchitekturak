<script lang="ts">
  // Egyelőre, hotfix.
  type TFormErrors = any[]

  interface ISelectItem {
    readonly value: string
    readonly name: string
  }

  export let formErrors: TFormErrors = []
  export let items: ISelectItem[]
  export let name: string
  export let selectedValue: string | undefined

  const defaultValue: ISelectItem = {
    name: "Kérlek válassz a lehetőségek közül",
    value: ""
  }

  const itemset = [
    defaultValue,
    ...items
  ]

  $: itemsToDisplay = searchValue === ''
    ? itemset
    : itemset.filter((e) => e.name.includes(searchValue))

  $: errorMsg = formErrors.find((el) => el.key === name)?.message ?? null

  let currentlySelected: ISelectItem = selectedValue
    ? items.find((el) => el.value === selectedValue) ?? defaultValue
    : defaultValue

  let isExpanded = false

  let searchValue = ''

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

<div class="selectbox-container ">
  <div class="selected-srapper">
    <input
      class={ `selectbox-currently-selected ${ errorMsg ? 'border border-danger': '' }`}
      readonly
      on:click={ () => {
        isExpanded = !isExpanded
        searchValue = ''
      } }
      bind:value={ currentlySelected.name }
    />
  {#if errorMsg}
    <small class="error-message"><p class="text-danger">{ errorMsg }</p></small>
  {/if}

  </div>

  {#if isExpanded}
    <div class="selectbox-options">
      <div class="col p-2">
        <input
          type="text"
          class="form-control shadow-none"
          placeholder="Keresés"
          bind:value={ searchValue }
          />
      </div>

      <div class="items">
        {#if itemsToDisplay.length > 0}
          {#each itemsToDisplay as item}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div
              class={ `item-row ${ item.value === currentlySelected.value ? 'active' :''}` }
              on:click={ () => onClickSelectItem(item) }
            >
              <p>{ item.name }</p>
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

<style>
  .selectbox-container {
    width: 100%;
    position: relative;
  }

  .selectbox-currently-selected {
    cursor: pointer;
    display: block;
    width: 100%;

    padding: .375rem .75rem;

    background-color: var(--input-bg);
    font-family: var(--font-family);
    font-size: var(--input-font-size);
    border: var(--input-border);
    border-radius: var(--input-border-radius);

    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    background-clip: padding-box;
    box-shadow: none;
    outline: none;
  }

  .selectbox-currently-selected:active, .selectbox-currently-selected:focus  {
    outline: 1px solid var(--bs-primary);
  }

  .selected-wrapper {
    margin-bottom: 0.2rem;
  }

  .error-message {
    position: absolute;
  }

  .selected-wrapper::after {
    position: absolute;
    top: 50%;
    right: 20px;
    width: 0;
    height: 0;
    content: '';
    -o-transform: rotate(0) translate3d(0,-50%,0);
    -ms-transform: rotate(0) translate3d(0,-50%,0);
    -moz-transform: rotate(0) translate3d(0,-50%,0);
    -webkit-transform: rotate(0) translate3d(0,-50%,0);
    transform: rotate(0) translate3d(0,50%,0);
    border-width: 4px 4px 0px;
    border-style: solid;
    border-color: #6c7a86 transparent transparent;
  }

  .selectbox-options {
    padding: 0.3rem;
    position: absolute;
    display: block;
    width: 100%;
    background-color: #FFFFFF;
    border-radius: 0.5rem;
    border: 2px solid var(--bs-primary);
  }

  .items {
    height: auto;
    max-height: 200px;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .item-row {
    padding: 0.3rem;
    border-top: 1px solid #dee2e6;
    cursor: pointer;
    user-select: none;
  }

  .item-row:hover, .item-row.active {
    background-color: rgba(0, 0, 0, 0.048);
  }
</style>
