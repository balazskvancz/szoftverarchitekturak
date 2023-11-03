<script lang="ts">
  export let cardClass: string = ''
</script>

<div class={`card ${ cardClass }`}>
  {#if $$slots.header}
    <div class="card-header text-center">
      <slot name="header" />
    </div>
  {/if}

  {#if $$slots.body}
    <div class="card-body">
      <slot name="body" />
    </div>
  {/if}

  {#if $$slots.footer}
    <div class="card-footer text-center">
      <slot name="footer" />
    </div>
  {/if}
</div>
