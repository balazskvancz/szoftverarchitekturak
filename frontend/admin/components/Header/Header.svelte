<script
  lang="ts"
  strictEvents
>
  import Cookie from '@common/Cookie/Cookie'

  import { LOGIN_HASH_COOKIE_NAME } from '../../definitions'

  import ajax from '../../ajax'

  /**
   * Kijelentkezés gomb eseménykezelője.
   * @param e - A kiváltó esemény.
   */
  async function handleOnClick (e: Event): Promise<void> {
    e.preventDefault()

    const loginHash = Cookie.get(document.cookie, LOGIN_HASH_COOKIE_NAME)

    if (!loginHash) {
      return
    }

    await ajax.logout(loginHash)

    window.location.reload()
  }
</script>

<div class="sticky-top">
  <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow p-2">
    <a
      class="navbar-brand col-md-3 col-lg-2 me-0 px-3"
      href="#!"
    >
      Csomagküldő – Admin
    </a>

    <button
      class="btn text-end"
      on:click={ handleOnClick }
      type="button"
    >
      <i class="bi bi-box-arrow-right text-light fs-4" />
    </button>
  </header>
</div>
