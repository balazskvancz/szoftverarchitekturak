<script lang="ts">
  import getRandomLetters from '@common/utils/getRandomLetters'

  type TOnChangeFn = (isChecked: boolean) => void

  export let label: string | undefined
  export let isChecked: boolean

  export let onChange: TOnChangeFn | undefined = undefined

  const checkBoxId = getRandomLetters(10)

  /**
   * Állapot megváltozás kezelője.
   * @param e - A kiváltó esemény.
   */
  function handleOnChange (e: Event): void {
    const el = e.currentTarget as HTMLInputElement

    isChecked = el.checked

    if (onChange) {
      onChange(isChecked)
    }
  }
</script>

<div class="form-check form-switch">
  <input
    class="form-check-input shadow-none"
    id={ checkBoxId }
    type="checkbox"
    checked={ isChecked }
    on:change={ handleOnChange }
  >
  {#if label}
    <label class="form-check-label" for={ checkBoxId }>{ label }</label>
  {/if}
</div>
