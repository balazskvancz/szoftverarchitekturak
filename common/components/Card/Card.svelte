<script
  lang="ts"
  strictEvents
>
  export let cardClass = ''
</script>

<div class="card { cardClass }">
  {#if $$slots.header}
    <div class="card-header text-start">
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
