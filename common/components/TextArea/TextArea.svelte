<script
  lang="ts"
  strictEvents
>
  import getRandomLetters from '@common/utils/getRandomLetters'

  import type { TFormErrors } from '../../definitions'

  import FormLabel from '../FormLabel/FormLabel.svelte'

  export let name: string | null = null
  export let autocomplete = 'on'
  export let spellcheck = false
  export let value = ''
  export let label: string | null = null
  export let formErrors: TFormErrors = []
  export let maxChars: number | undefined = undefined

  $: errorMsg = formErrors.find((el) => el.key === name)?.message ?? null

  const ID_LENGTH = 10

  const id = getRandomLetters(ID_LENGTH)
</script>

<div class="form-outline mb-4">
  {#if label !== null}
    <FormLabel
      forElement={ id }
      { label } />
  {/if}
  <textarea
    { id }
    class="form-control form-control-lg shadow-none"
    class:border={ errorMsg }
    class:border-2={ errorMsg }
    class:border-danger={ errorMsg }
    bind:value
    { autocomplete }
    { name }
    rows="4"
    { spellcheck }
  />
  {#if maxChars}
    <p>{value.length} / {maxChars}</p>
  {/if}
  {#if errorMsg}
    <small><p class="text-danger">{errorMsg}</p></small>
  {/if}
</div>
