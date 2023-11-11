<script
  lang="ts"
  strictEvents
>
  import DeleteButton from '@common/components/DeleteButton/DeleteButton.svelte'
  import EditButton   from '@common/components/EditButton/EditButton.svelte'

  import {
    onCustomerOpen,
    onCustomerDelete
  } from '../../store'

  import type { ICustomer } from '../../definitions'

  export let data: ICustomer

  /**
   * Törlés gomb eseménykezelője.
   * @param e - A kiváltó esemény.
   */
  function handleOnDelete (e: Event): void {
    e.preventDefault()

    onCustomerDelete.set(data.id)
    onCustomerDelete.set(null)
  }

  /**
   * Megnyitás gomb eseménykezelője.
   * @param e - A kiváltó esemény.
   */
  function handleOnOpen (e: Event): void {
    e.preventDefault()

    onCustomerOpen.set(data.id)
    onCustomerOpen.set(null)
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
