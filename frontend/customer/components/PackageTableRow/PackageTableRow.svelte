<script
  lang="ts"
  strictEvents
>
  import Accordion  from '@common/components/Accordion/Accordion.svelte'
  import Alert      from '@common/components/Alert/Alert.svelte'
  import Badge      from '@common/components/Badge/Badge.svelte'
  import Button     from '@common/components/Button/Button.svelte'

  import type { IDigestPackage } from '../../definitions'

  import { PACKAGE_LIFE_CYCLE_ACTION_NAMES } from '../../definitions'

  import { onOpenHistoryModal } from '../../store'

  export let data: IDigestPackage

  /**
   * Historikus adatokat megjelenítő modal gomb eseménykezelője.
   * @param e - A kiváltó esemény.
   */
  function onClickOpenModal (e: Event): void {
    e.preventDefault()

    onOpenHistoryModal.set(data.id)
    onOpenHistoryModal.set(null)
  }

  const dimension = `${ data.width }cm x ${ data.length }cm x ${ data.depth }cm`

  const { action, createdAt } = data.lifeCycles[0]

  const stateName = PACKAGE_LIFE_CYCLE_ACTION_NAMES[action]
</script>

<tr>
  <td class="align-middle w-25">{dimension}</td>
  <td class="align-middle w-25">
    <Badge
      isWrapped
      state="primary"
    >
      {data.receiverName}
    </Badge>

    <Badge
      isWrapped
      state="primary"
    >
      {data.receiverEmail}
    </Badge>

  </td>
  <td class="align-middle w-25">
    <Accordion title="Megtekintés">
      {data.destAddress?.country},
      {data.destAddress?.postalCode}
      {data.destAddress?.city}
      {data.destAddress?.street}
      {data.destAddress?.house}
    </Accordion>
  </td>
  <td class="align-middle w-25">
    <Alert>
      <b>{stateName}</b>
      <hr class="my-3" />
      {createdAt}
    </Alert>

    <Button
      btnType="button"
      className="btn-primary"
      onClick={ onClickOpenModal }
    >
      <i class="bi bi-clock-history" />
    </Button>
  </td>
</tr>
