<script
  lang="ts"
  strictEvents
>
  import Button from '@common/components/Button/Button.svelte'
  import Modal  from '@common/components/Modal/Modal.svelte'
  import Table  from '@common/components/Table/Table.svelte'

  import type { TPackageLifeCycles } from '../../definitions'

  import LifeCycleTableRow from '../LifeCycleTableRow/LifeCycleTableRow.svelte'

  export let isOpened = false
  export let data: TPackageLifeCycles

  /**
   * Bezárás gomb eseménykezelője.
   * @param e - A kiváltó esemény.
   */
  function onClickClose (e: Event): void {
    e.preventDefault()

    isOpened = false
  }

  const TABLE_HEADERS = [
    'Dátum',
    'Művelet'
  ]
</script>

<Modal
  bind:isOpened
  title="Korrábi életciklus események"
>
  <div slot="body">
    <Table
      bind:data
      headers={ TABLE_HEADERS }
      rowComponent={ LifeCycleTableRow }
    />
  </div>

  <div
    class="modal-footer"
    slot="footer">
    <Button
      btnType="button"
      className="btn-danger"
      onClick={ onClickClose }
    >
      Bezárás
    </Button>
  </div>
</Modal>
