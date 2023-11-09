<script
  lang="ts"
  strictEvents
>
  import type { TFormErrors } from '../../definitions'

  import getRandomLetters from '@common/utils/getRandomLetters'

  import FormLabel from '../FormLabel/FormLabel.svelte'

  export let name: string | null = null
  export let type: 'text' | 'date' = 'text'
  export let autocomplete = 'off'
  export let value = ''
  export let label: string | null = null
  export let placeholder: string
  export let formErrors: TFormErrors = []

  $: errorMsg = formErrors.find((el) => el.key === name)?.message ?? null

  /**
   * Input módosítás eseménykezelőej.
   * @param e - A kiváltó esemény.
   */
  function onChange (e: Event): void {
    const currentTarget = e.currentTarget as HTMLInputElement

    value = currentTarget.value
  }

  const ID_LENGTH = 10

  const id = getRandomLetters(ID_LENGTH)
</script>

<div class="form-outline mb-4 text-start">
  {#if label !== null}
    <FormLabel
      forElement={ id }
      { label }
    />
  {/if}
  <input
    class="form-control form-control-lg shadow-none "
    class:border={ Boolean(errorMsg) }
    class:border-danger={ Boolean(errorMsg) }
    { value }
    on:change={ onChange }
    { autocomplete }
    { name }
    { placeholder }
    { type }
  />
  {#if errorMsg}
    <small><p class="text-danger">{errorMsg}</p></small>
  {/if}
</div>
