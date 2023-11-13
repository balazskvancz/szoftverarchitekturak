<script
  lang="ts"
  strictEvents
>
  import { onDestroy } from 'svelte'

  import { onSuccessOccured } from './store'

  import ToastAlert from '@common/components/ToastAlert/ToastAlert.svelte'

  import Header  from './components/Header/Header.svelte'
  import Sidebar from './components/Sidebar/Sidebar.svelte'

  import Router from './Router.svelte'

  import './app.css'

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
  <div class="mainc">
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

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --font-family: var(--bs-body-font-family);
    --input-font-size: 1.20rem;
    --input-padding: 0.8rem;
    --input-border-radius: 10px;
  }

  body {
    min-height: 100vh;
    height: 100%;
    background-color: #E8E7E7;
    position: relative;
    font-family: var(--font-family);
    margin: 0 auto;
    text-align: center;
  }
</style>
