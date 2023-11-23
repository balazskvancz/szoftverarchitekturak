<script
  lang="ts"
  strictEvents
>
  import { onMount } from 'svelte'

  import Validator from '@common/Validator/Validator'

  import Alert        from '@common/components/Alert/Alert.svelte'
  import Button       from '@common/components/Button/Button.svelte'
  import ConfirmModal from '@common/components/ConfirmModal/ConfirmModal.svelte'
  import Loading      from '@common/components/Loading/Loading.svelte'

  import CurrentJobCard from '../CurrentJobCard/CurrentJobCard.svelte'

  import type { ICurrentJob } from '../../definitions'

  import ajax from '../../ajax'

  let currentJob: ICurrentJob | null = null

  let isLoaded = false

  let isConfirmModalOpened = false

  /** Új feladat igénylése gomb eseménykezelője. */
  function onClickNewTask (): void {
    isConfirmModalOpened = true
  }

  /** Adat szervertől való lekérdezése. */
  async function getData (): Promise<void> {
    currentJob = await ajax.getCurrentJob()
  }

  /** Visszaállítja alaphelyzetbe. */
  function onFinished (): void {
    currentJob = null
  }

  /**
   * Visszaigazoló modal bezárás kezelője.
   * @param isConfirmed - Vissza lett-e igazolva.
   */
  async function onConfirmModalClosed (isConfirmed: boolean): Promise<void> {
    if (!isConfirmed) {
      return
    }

    const nextJob = await ajax.getNextJob()

    if (nextJob) {
      currentJob = nextJob
    }
  }

  onMount(async () => {
    await getData()
    isLoaded = true
  })
</script>

<ConfirmModal
  bind:isOpened={ isConfirmModalOpened }
  onClose={ onConfirmModalClosed }
  title="Biztosan igényelsz új feladatot?"
/>

<div class="container-fluid">
  {#if isLoaded}
    {#if Validator.isNull(currentJob)}
      <div class="row">
        <div class="col-sm-12 col-md-6 mx-auto p-3">
          <Alert>
            Jelenleg nincs egy feladat sem hozzád rendelve. <br />

            A lenti gomb megnyomásával tudsz új feladatot igényelni!
          </Alert>
        </div>

        <div class="col-sm-12 p-3 text-center">
          <Button
            btnType="button"
            className="btn-primary btn-lg"
            onClick={ onClickNewTask }
          >
            Új feladat igénylés <i class="bi bi-list-task" />
          </Button>
        </div>
      </div>
    {:else}
      <CurrentJobCard
        bind:data={ currentJob }
        { onFinished }
      />
    {/if}

  {:else}
    <Loading />
  {/if}
</div>
