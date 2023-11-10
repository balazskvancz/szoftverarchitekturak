<script
  lang="ts"
  strictEvents
>
  import Button from '../Button/Button.svelte'
  import Modal  from '../Modal/Modal.svelte'

  export let title: string
  export let isOpened = true

  export let onClose: (isConfirmed: boolean) => void | Promise<void>

  /**
   * Valamelyik gomb kattintásának kezelője.
   * @param isConfirmed - Jóvá lett-e hagyva.
   */
  function onClickHandler (isConfirmed: boolean): void {
    isOpened = false
    onClose(isConfirmed)
  }
</script>

<Modal
  bind:isOpened
  onClosed={ () => onClose(false) }
  { title }>

  <div
    class="modal-footer"
    slot="footer">
    <Button
      className="btn btn-danger"
      onClick={ () => onClickHandler(false) }
    >
      Bezárás
    </Button>

    <Button
      className="btn btn-success"
      onClick={ () => onClickHandler(true) }
    >
      Jóváhagyás
    </Button>
  </div>

</Modal>
