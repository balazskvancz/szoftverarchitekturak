<script
  lang="ts"
  strictEvents
>
  import { onMount, onDestroy } from 'svelte'

  import { onSuccessOccured } from './store'

  import Loading    from '@common/components/Loading/Loading.svelte'
  import ToastAlert from '@common/components/ToastAlert/ToastAlert.svelte'

  import AuthPage from './components/AuthPage/AuthPage.svelte'
  import Header   from './components/Header/Header.svelte'
  import Sidebar  from './components/Sidebar/Sidebar.svelte'

  import Router from './Router.svelte'

  import './app.css'

  import initSession from './initSession'

  let isSuccessOccured = false
  let toastMessage = ''

  let isLoaded = false
  let isAdmin  = false

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

  onMount(async () => {
    isAdmin   = await initSession()
    isLoaded  = true
  })
</script>

{#if isLoaded}
  {#if isAdmin}
    <ToastAlert
      bind:isShown={ isSuccessOccured }
      alertType="success">
      {toastMessage}
    </ToastAlert>

    <Header />

    <div class="container-fluid p-0 min-vh-100 d-flex">
      <div class="container-fluid min-vh-100">
        <div class="row h-100">
          <Sidebar />

          <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <Router />
          </main>
        </div>
      </div>
    </div>
  {:else}
    <AuthPage />
  {/if}
{:else}
  <Loading />
{/if}
