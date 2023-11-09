<script
  lang="ts"
  strictEvents
>
  import Card from '../Card/Card.svelte'

  export let pageTitle: string
</script>

<Card cardClass="mt-3 p-2">
  <div slot="body">
    <div class="col-sm-12 text-start">
      <h2>{pageTitle}</h2>
    </div>

    {#if $$slots.dashboardHeader}
      <slot name="dashboardHeader" />

      <hr class="my-3" />
    {/if}

    <slot name="content" />
  </div>
</Card>
