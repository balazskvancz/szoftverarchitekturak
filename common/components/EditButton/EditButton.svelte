<script
  lang="ts"
  strictEvents
>
  import Button from '../Button/Button.svelte'

  export let onClick: (e: Event) => void | Promise<void>
</script>

<Button
  className="btn btn-warning"
  { onClick }>
  <i class="bi bi-pencil-square" />
</Button>
