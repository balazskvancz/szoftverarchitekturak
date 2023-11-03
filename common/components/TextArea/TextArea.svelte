<script lang="ts">
  import getRandomLetters from '@common/utils/getRandomLetters'

  import FormLabel from '../FormLabel/FormLabel.svelte'

  type TFormErrors = any[]

  export let name: string | null = null
  export let autocomplete = 'on'
  export let spellcheck = false
  export let value: string = ''
  export let label: string | null = null
  export let formErrors: TFormErrors = []
  export let maxChars: number | undefined = undefined

  $: errorMsg = formErrors.find((el) => el.key === name)?.message ?? null

  const id = getRandomLetters(10)
</script>

<div class="form-outline mb-4">
  {#if label !== null}
    <FormLabel { label } forElement={ id } />
  {/if}
  <textarea
    { id }
    rows="4"
    bind:value
    { spellcheck }
    class={`form-control form-control-lg shadow-none ${ errorMsg ? 'border border-2 border-danger' : ''}`}
    { name }
    { autocomplete }
  />
  {#if maxChars}
    <p>{ value.length } / { maxChars }</p>
  {/if}
  {#if errorMsg}
    <small><p class="text-danger">{ errorMsg }</p></small>
  {/if}
</div>
