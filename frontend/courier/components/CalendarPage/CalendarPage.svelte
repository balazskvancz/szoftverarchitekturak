<script
  lang="ts"
  strictEvents
>
  import { onMount, onDestroy } from 'svelte'

  import Alert          from '@common/components/Alert/Alert.svelte'
  import Button         from '@common/components/Button/Button.svelte'
  import DashboardCard  from '@common/components/DashboardCard/DashboardCard.svelte'
  import Table          from '@common/components/Table/Table.svelte'

  import ajax from '../../ajax'

  import {
    onSuccessOccured,
    onCalendarDayChange
  } from '../../store'

  import type { TCourierCalendarWeek } from '../../definitions'

  import CalendarTableRow from '../CalendarTableRow/CalendarTableRow.svelte'

  const tableHeaders = [
    'Hétfő',
    'Kedd',
    'Szerda',
    'Csütörtök',
    'Péntek',
    'Szombat',
    'Vasárnap'
  ]

  let data: TCourierCalendarWeek[] = []

  let selectedDays: string[] = []

  /** Egy naptári nap megváltozását figyelő eseménykezelő. */
  const unsubscribeOnCalendarDayChange = onCalendarDayChange.subscribe((v) => {
    if (!v) {
      return
    }

    const { date, isSelected } = v

    // Ekkor tudjuk, hogy hozzá kell adni a tömbhöz.
    if (isSelected) {
      selectedDays.push(date)

      return
    }

    // Különben pedig ki kell törölni a meglévők közül.
    selectedDays = selectedDays.filter((e) => e !== date)
  })

  /** Lekérdezi az adatokat a szervertől. */
  async function getData (): Promise<void> {
    data = await ajax.getCourierCalendar()

    selectedDays = data.reduce((acc, curr) => {
      const inner = curr.reduce((innerAcc, innerCurr) => {
        if (innerCurr.isSetForWorking) {
          innerAcc.push(innerCurr.date)
        }

        return innerAcc
      }, [] as string[])

      acc.push(...inner)

      return acc
    }, [] as string[])
  }

  /** Sikeres művelet kezelője. */
  function handleSuccess (): void {
    onSuccessOccured.set('Sikeres művelet!')
  }

  /**
   * Mentés gomb eseménykezelője.
   * @param e - A kiváltó esemény.
   */
  async function onClickSave (e: Event): Promise<void> {
    e.preventDefault()

    const error = await ajax.setWorkingDays({
      dates: selectedDays
    })

    if (!error) {
      handleSuccess()

      await getData()
    }
  }

  onMount(async () => {
    await getData()
  })

  onDestroy(() => {
    unsubscribeOnCalendarDayChange()
  })
</script>

<DashboardCard pageTitle="Naptár">
  <div
    class="col-sm-12 text-end"
    slot="dashboardHeader">
    <Button
      btnType="button"
      className="btn-success"
      onClick={ onClickSave }
    >
      Mentés
    </Button>
  </div>

  <div slot="content">

    <Alert alertType="info">
      Az alábbiakban láthatod az ehavi naptáradat, amely mutatja, hogy melyik napokon dolgozol. <br /> <br />

      Ha egy adott nap háttérszíne <b>zöld</b>, akkor aznap nem dolgozol.
      Ha egy nap háttérszíne <b>piros</b>, akkor aznapra jelentkeztél munkára. <br />

      Az egyes napokra kattintva tudod változtatni a munkavállalással kapcsolatos igényeidet,
      majd ezt végelegesíteni a „Mentés” gomb megnyomásával tudod. <br /> <br />

      <b>Fontos</b>, hogy visszamenőleg nincs lehetőséged a napok megváltoztatására.
    </Alert>

    <Table
      bind:data
      headers={ tableHeaders }
      rowComponent={ CalendarTableRow }
    />
  </div>
</DashboardCard>
