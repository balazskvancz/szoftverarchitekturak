<script
  lang="ts"
  strictEvents
>
  import { fade } from 'svelte/transition'

  import type { TState } from '../definitions'

  import Alert from '../Alert/Alert.svelte'

  import styles from './ToastAlert.css'

  export let alertType: TState  = 'primary'
  export let timeOut = 3000
  export let isShown: boolean

  function onChange (..._args: boolean[]): void {
    if (isShown && timeOut > 0) {
      setTimeout(() => {
        // eslint-disable-next-line svelte/infinite-reactive-loop
        isShown = false
      }, timeOut)
    }
  }

  // eslint-disable-next-line svelte/infinite-reactive-loop
  $: onChange(isShown)
</script>

{#if isShown}
  <div
    class="container p-3 { styles.toastAlert }"
    in:fade
    out:fade
  >
    <div class="col-sm-12-col-md-6 col-lg-4 mx-auto">
      <Alert
        bind:isShown
        { alertType }
      >
        <slot />
      </Alert>
    </div>
  </div>
{/if}
