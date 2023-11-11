<script
  lang="ts"
  strictEvents
>
  import DeleteButton from '@common/components/DeleteButton/DeleteButton.svelte'
  import EditButton   from '@common/components/EditButton/EditButton.svelte'

  import {
    onAdminOpen,
    onAdminDelete
  } from '../../store'

  import type { IAdmin } from '../../definitions'

  export let data: IAdmin

  /**
   * Törlés gomb eseménykezelője.
   * @param e - A kiváltó esemény.
   */
  function handleOnDelete (e: Event): void {
    e.preventDefault()

    onAdminDelete.set(data.id)
    onAdminDelete.set(null)
  }

  /**
   * Megnyitás gomb eseménykezelője.
   * @param e - A kiváltó esemény.
   */
  function handleOnOpen (e: Event): void {
    e.preventDefault()

    onAdminOpen.set(data.id)
    onAdminOpen.set(null)
  }
</script>

<tr>
  <td class="align-middle">{data.name}</td>
  <td class="align-middle">{data.email}</td>
  <td class="align-middle">{data.createdAt}</td>
  <td class="align-middle">
    <EditButton onClick={ handleOnOpen } />
    <DeleteButton onClick={ handleOnDelete } />
  </td>
</tr>
