<script
  lang="ts"
  strictEvents
>
  import type { ComponentType } from 'svelte'

  export let data: readonly TAnyObject[]
  export let headers: string[]
  export let rowComponent: ComponentType
</script>

<div class="table-responsive">
  <table class="table table-striped table-hover table-bordered">
    <thead>
      <tr>
        {#each headers as header (header)}
          <th scope="col">{header}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each data as d (d)}
        <svelte:component
          this={ rowComponent }
          { ...{ data: d } } />
      {/each}
    </tbody>
  </table>
</div>
