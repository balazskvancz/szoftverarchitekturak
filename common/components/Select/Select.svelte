<script
  lang="ts"
  strictEvents
>
  import getRandomLetters     from '@common/utils/getRandomLetters'

  import type { TSelectValues } from '../definitions'
  import type { TFormErrors } from '../../definitions'

  import FormLabel from '../FormLabel/FormLabel.svelte'

  export let values: TSelectValues
  export let value: string | undefined = undefined
  export let label: string | null = null
  export let name: string | null = null
  export let formErrors: TFormErrors = []

  $: errorMsg = formErrors.find((el) => el.key === name)?.message ?? null
  $: isError  = Boolean(errorMsg)

  const ID_LENGTH = 10

  const ID = getRandomLetters(ID_LENGTH)

  /**
   * Megváltozást kezelő függvény.
   * @param e - A kiváltó esemény.
   */
  function handleOnChange (e: Event): void {
    const el = e.currentTarget as HTMLSelectElement

    value = el.value
  }
</script>

<div class="form-outline mb-4 text-start">
  {#if label !== null}
    <FormLabel
      forElement={ ID }
      { label } />
  {/if}
  <select
    id={ ID }
    class="form-select shadow-none"
    class:border={ isError }
    class:border-danger={ isError }
    on:change={ handleOnChange }
    aria-label="Kiválasztás"
  >
    <option value="0">Kérlek válassz!</option>
    {#each values as { text, value: v } (v)}
      {#if v === value}
        <option
          value={ v }
          selected>{text}</option>
      {:else}
        <option value={ v }>{text}</option>
      {/if}
    {/each}
  </select>
  {#if errorMsg}
    <small><p class="text-danger">{errorMsg}</p></small>
  {/if}
</div>
