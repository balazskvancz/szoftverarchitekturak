<script
  lang="ts"
  strictEvents
>
  import type { TCourierCalendarWeek } from '../../definitions'

  import CalenderTableCell from '../CalenderTableCell/CalenderTableCell.svelte'

  export let data: TCourierCalendarWeek = []
</script>

<tr>
  {#each data as day}
    <CalenderTableCell data={ day } />
  {/each}
</tr>
