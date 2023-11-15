<script
  lang="ts"
  strictEvents
>
  import DeleteButton from '@common/components/DeleteButton/DeleteButton.svelte'

  import {
    onDeleteAddress
  } from '../../store'

  import type { IPackage } from '../../definitions'

  export let data: IPackage

  /**
   * Törlés gomb eseménykezelője.
   * @param e - A kiváltó esemény.
   */
  function handleOnDelete (e: Event): void {
    e.preventDefault()

    onDeleteAddress.set(data.id)
    onDeleteAddress.set(null)
  }

</script>

<tr>
  <td class="align-middle">{data.country}</td>
  <td class="align-middle">{data.postalCode}, {data.city}</td>
  <td class="align-middle">{data.street} {data.house}</td>
  <td class="align-middle">
    <DeleteButton onClick={ handleOnDelete } />
  </td>
</tr>
