<script
  lang="ts"
  strictEvents
>
  import getRandomLetters from '@common/utils/getRandomLetters'

  type TOnChangeFn = (isChecked: boolean) => void

  export let label: string | undefined
  export let isChecked: boolean

  export let onChange: TOnChangeFn | undefined = undefined

  const ID_LENGTH = 10

  const checkBoxId = getRandomLetters(ID_LENGTH)

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
    id={ checkBoxId }
    class="form-check-input shadow-none"
    on:change={ handleOnChange }
    checked={ isChecked }
    type="checkbox"
  />
  {#if label}
    <label
      class="form-check-label"
      for={ checkBoxId }>{label}</label>
  {/if}
</div>
