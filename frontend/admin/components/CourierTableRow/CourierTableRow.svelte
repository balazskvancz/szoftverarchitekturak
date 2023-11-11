<script
  lang="ts"
  strictEvents
>
  import DeleteButton from '@common/components/DeleteButton/DeleteButton.svelte'
  import EditButton   from '@common/components/EditButton/EditButton.svelte'

  import {
    onCourierOpen,
    onCourierDelete
  } from '../../store'

  import type { ICourier } from '../../definitions'

  export let data: ICourier

  /**
   * Törlés gomb eseménykezelője.
   * @param e - A kiváltó esemény.
   */
  function handleOnDelete (e: Event): void {
    e.preventDefault()

    onCourierDelete.set(data.id)
    onCourierDelete.set(null)
  }

  /**
   * Megnyitás gomb eseménykezelője.
   * @param e - A kiváltó esemény.
   */
  function handleOnOpen (e: Event): void {
    e.preventDefault()

    onCourierOpen.set(data.id)
    onCourierOpen.set(null)
  }
</script>

<tr>
  <td class="align-middle">{data.name}</td>
  <td class="align-middle">{data.email}</td>
  <td class="align-middle">{data.phoneNum}</td>
  <td class="align-middle">{data.createdAt}</td>
  <td class="align-middle">
    <EditButton onClick={ handleOnOpen } />
    <DeleteButton onClick={ handleOnDelete } />
  </td>
</tr>
