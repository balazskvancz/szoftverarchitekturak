<script lang="ts">
  import type { TState } from '../definitions'

  export let alertType: TState = 'primary'
  export let needCloseButton = false
  export let isShown = true
</script>

{#if isShown}
  <div class={`alert alert-${ alertType } alert-dismissible fade show`} role="alert">
    <slot />

    {#if needCloseButton }
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    {/if}
  </div>
{/if}
