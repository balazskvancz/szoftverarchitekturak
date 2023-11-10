<script
  lang="ts"
  strictEvents
>
  import DeleteButton from '@common/components/DeleteButton/DeleteButton.svelte'
  import EditButton   from '@common/components/EditButton/EditButton.svelte'

  import {
    onDimensionOpen,
    onDimensionDelete
  } from '../../store'

  import type { IDimension } from '../../definitions'

  export let data: IDimension

  /**
   * Törlés gomb eseménykezelője.
   * @param e - A kiváltó esemény.
   */
  function handleOnDelete (e: Event): void {
    e.preventDefault()

    onDimensionDelete.set(data.id)
    onDimensionDelete.set(null)
  }

  /**
   * Megnyitás gomb eseménykezelője.
   * @param e - A kiváltó esemény.
   */
  function handleOnOpen (e: Event): void {
    e.preventDefault()

    onDimensionOpen.set(data.id)
    onDimensionOpen.set(null)
  }

  const DIMENSION = `${ data.width }cm x ${ data.length }cm x ${ data.depth }cm`
</script>

<tr>
  <td class="align-middle">{data.id}</td>
  <td class="align-middle">{DIMENSION}</td>
  <td class="align-middle">{data.createdAt}</td>
  <td class="align-middle">
    <EditButton onClick={ handleOnOpen } />
    <DeleteButton onClick={ handleOnDelete } />
  </td>

</tr>
