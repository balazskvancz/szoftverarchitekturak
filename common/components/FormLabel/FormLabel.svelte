<script
  lang="ts"
  strictEvents
>
  export let forElement = ''
  export let label: string
</script>

<label
  class="form-label"
  for={ forElement }
>
  {label}
</label>
