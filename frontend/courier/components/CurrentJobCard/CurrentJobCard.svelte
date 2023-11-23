<script
  lang="ts"
  strictEvents
>
  import Validator from '@common/Validator/Validator'

  import Alert        from '@common/components/Alert/Alert.svelte'
  import Button       from '@common/components/Button/Button.svelte'
  import Card         from '@common/components/Card/Card.svelte'
  import ConfirmModal from '@common/components/ConfirmModal/ConfirmModal.svelte'

  import type { TJobResult, ICurrentJob } from '../../definitions'

  import {
    onSuccessOccured
  } from '../../store'

  import ajax from '../../ajax'

  export let data: ICurrentJob
  export let onFinished: () => void

  let selectedResult: TJobResult | null = null

  let errorMessage: string | null = null

  let isConfirmModalOpened = false

  /**
   * Eredmény gombok closurejei.
   * @param result - Eredmény (sikeres/sikertelen).
   */
  function onClickClosure (result: TJobResult): (e: Event) => void {
    return (e: Event) => {
      e.preventDefault()

      selectedResult = result

      isConfirmModalOpened = true
    }
  }

  /**
   * Visszaigazolás modal kezelője.
   * @param isConfirmed - Vissza lett-e igazolva.
   */
  async function onConfirmModalClosed (isConfirmed: boolean): Promise<void> {
    const result = selectedResult

    selectedResult = null

    if (!isConfirmed) {
      return
    }

    if (!result) {
      return
    }

    const error = await ajax.setJobDone(data.jobId, {
      result
    })

    if (error) {
      errorMessage = error.message ?? 'Ismeretlen hiba!'

      return
    }

    onSuccessOccured.set('Sikeres művelet!')
    onSuccessOccured.set(null)

    onFinished()
  }
</script>

<ConfirmModal
  bind:isOpened={ isConfirmModalOpened }
  onClose={ onConfirmModalClosed }
  title="Biztosan?"
/>

{#if Validator.isNonEmptyString(errorMessage)}
  <div class="row">
    <div class="col-sm-12 col-md-6 mx-auto p-2">
      <Alert alertType="danger">
        {errorMessage}
      </Alert>
    </div>
  </div>

{/if}

<Card>
  <div
    class="text-center"
    slot="header">
    {#if data.action === 'pickedUp'}
      <h3>Csomag felvétele feladótól</h3>
    {/if}

    {#if data.action === 'onDelivery'}
      <h3>Csomag kiszállítása</h3>
    {/if}
  </div>

  <div slot="body">
    <h4>Csomag adatok</h4>
    <div class="row">
      <div class="col-sm-12 col-md-6 text-lg-end">Méretek: </div>
      <div class="col-sm-12 col-md-6">{data.package.width}x{data.package.length}x{data.package.depth}</div>
    </div>

    <div class="row">
      <div class="col-sm-12 col-md-6 text-lg-end">Súly:</div>
      <div class="col-sm-12 col-md-6">{data.package.weight} kg</div>
    </div>

    <hr class="my-3" />

    <h4>Cím adatok</h4>

    <div class="row">
      <div class="col-sm-12 col-md-6 text-lg-end">Címzett név:</div>
      <div class="col-sm-12 col-md-6">{data.package.receiverName}</div>

      <div class="col-sm-12 col-md-6 text-lg-end">Címtett e-mail:</div>
      <div class="col-sm-12 col-md-6">{data.package.receiverEmail}</div>

    </div>

    <div class="row">
      <div class="col-sm-12 col-md-6 text-lg-end">Cím:</div>
      {#if data.action === 'pickedUp'}
        <div class="col-sm-12 col-md-6 ">
          {data.package.pickUpAddress.country}, {data.package.pickUpAddress.postalCode}
          {data.package.pickUpAddress.city} {data.package.pickUpAddress.street} {data.package.pickUpAddress.house}
        </div>
      {:else}
        <div class="col-sm-12 col-md-6">
          {data.package.destAddress.country}, {data.package.destAddress.postalCode}
          {data.package.destAddress.city} {data.package.destAddress.street} {data.package.destAddress.house}
        </div>
      {/if}
    </div>
  </div>

  <div slot="footer">
    <Button
      btnType="button"
      className="btn-danger"
      onClick={ onClickClosure('fail') }
    >
      Sikertelen
    </Button>
    <Button
      btnType="button"
      className="btn-success"
      onClick={ onClickClosure('success') }
    >
      Sikeres
    </Button>
  </div>
</Card>
