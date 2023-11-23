<script
  lang="ts"
  strictEvents
>
  import { getDate } from '@common/utils/dateAndTime'

  import type { ICourierCalendarDay } from '../../definitions'

  import { onCalendarDayChange } from '../../store'

  import styles from './CalenderTableCell.css'

  export let data: ICourierCalendarDay

  let isSelected = data.isSetForWorking

  function handleOnClick (e: Event): void {
    e.preventDefault()

    // Üres napra nem lehet kattintani.
    if (data.date === '') {
      return
    }

    // És korábbira sem.
    const currentDate = new Date()
    const dayDate     = new Date(data.date)

    if (dayDate.getTime() < currentDate.getTime()) {
      return
    }

    isSelected = !isSelected

    onCalendarDayChange.set({
      date: data.date,
      isSelected
    })

    onCalendarDayChange.set(null)
  }
</script>

<td
  class="text-light { styles.cCell } "
  class:bg-success={ !isSelected && data.date !== '' }
  class:bg-danger={ isSelected }
  on:click={ handleOnClick }
>
  {data.date}
  {#if getDate(Date.now()) === data.date}
    <i class="bi bi-pin-angle-fill" />
  {/if}
</td>
