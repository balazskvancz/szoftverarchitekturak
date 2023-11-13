<script
  lang="ts"
  strictEvents
>
  import { onDestroy } from 'svelte'

  import { onSuccessOccured } from './store'

  import ToastAlert from '@common/components/ToastAlert/ToastAlert.svelte'

  import Header   from './components/Header/Header.svelte'
  import Sidebar  from './components/Sidebar/Sidebar.svelte'

  import Router from './Router.svelte'

  import styles from './app.css'

  let isSuccessOccured = false
  let toastMessage = ''

  /** Sikeres művelet eseménykezelője. */
  const unsubscribeSuccessOccured = onSuccessOccured.subscribe((v) => {
    if (v) {
      isSuccessOccured  = true
      toastMessage      = v
    }

    onSuccessOccured.set(null)
  })

  onDestroy(() => {
    unsubscribeSuccessOccured()
  })
</script>

<ToastAlert
  bind:isShown={ isSuccessOccured }
  alertType="success">
  {toastMessage}
</ToastAlert>

<div class="container-fluid p-0 min-vh-100 d-flex flex-column">
  <div class="sticky-top">
    <Header />
  </div>
  <div class={ styles.mainc }>
    <div class="container-fluid">
      <div class="row h-100">
        <Sidebar />

        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <Router />
        </main>
      </div>
    </div>
  </div>
</div>
