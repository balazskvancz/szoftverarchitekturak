<script lang="ts">
  export let open = false
  export let showBackdrop = true
  export let onClosed: () => void = (): void => {} // Legyen default.

  export let title: string = ''

  const modalClose = () => {
    open = false
    if (onClosed) {
      onClosed()
    }
  }
</script>

{#if open}
  <div
    class="modal"
    tabindex="-1"
    role="dialog"
    aria-hidden={false}
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{ title }</h5>
          <button
            type="button"
            class="btn close"
            data-dismiss="modal"
            aria-label="Close"
            on:click={modalClose}
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
              type="button"
              class="btn btn-secondary"
              on:click={modalClose}
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
  .modal {
    display: block;
  }
</style>
