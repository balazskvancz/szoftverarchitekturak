<script
  lang="ts"
  strictEvents
>
  import Button from '../Button/Button.svelte'

  export let onClick: (e: Event) => void | Promise<void>
</script>

<Button
  className="btn btn-danger"
  { onClick }>
  <i class="bi bi-trash" />
</Button>
