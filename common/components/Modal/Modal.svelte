<script
  lang="ts"
  strictEvents
>
  /** Alap onClose. */
  function defaultOnClose (): void { /***/ }

  export let isOpened = false
  export let showBackdrop = true
  export let onClosed: () => void = defaultOnClose // Legyen default.

  export let title = ''

  /** Bezárás.*/
  function modalClose (): void {
    isOpened = false

    if (onClosed) {
      onClosed()
    }
  }
</script>

{#if isOpened}
  <div
    class="modal custom-modal"
    aria-hidden={ false }
    role="dialog"
    tabindex="-1"
  >
    <div
      class="modal-dialog"
      role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{title}</h5>
          <button
            class="btn close"
            data-dismiss="modal"
            on:click={ modalClose }
            aria-label="Close"
            type="button"
          >
            <span aria-hidden="true">&times;</span>
          </button>

        </div>

        {#if $$slots.body}
          <div class="modal-body">
            <slot name="body" />
          </div>
        {/if}

        {#if $$slots.footer}
          <slot name="footer" />
        {:else}
          <div class="modal-footer">
            <button
              class="btn btn-secondary"
              on:click={ modalClose }
              type="button"
            >
              Close
            </button>
          </div>
        {/if}
      </div>
    </div>
  </div>

  <!-- Backdrop -->
  {#if showBackdrop}
    <div class="modal-backdrop show" />
  {/if}
{/if}

<style>
  .custom-modal {
    display: block;
  }
</style>
