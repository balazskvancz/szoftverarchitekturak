<script lang="ts">
  import getRandomLetters from '@common/utils/getRandomLetters'

  import FormLabel from '../FormLabel/FormLabel.svelte'

  type TFormErrors = any[]

  export let name: string | null = null
  export let type: 'text' | 'date' = 'text'
  export let autocomplete = 'off'
  export let value: string = ''
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

  const id = getRandomLetters(10)
</script>

<div class="form-outline mb-4">
  {#if label !== null}
    <FormLabel
      { label }
      forElement={ id }
    />
  {/if}
    <input
      class={`form-control form-control-lg shadow-none ${ errorMsg ? 'border border-2 border-danger' : ''}`}
      { value }
      { type }
      { name }
      { autocomplete }
      { placeholder }
      on:change={ onChange }
    />
  {#if errorMsg}
    <small><p class="text-danger">{ errorMsg }</p></small>
  {/if}
</div>
