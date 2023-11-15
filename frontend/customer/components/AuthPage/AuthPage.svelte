<script
  lang="ts"
  strictEvents
>
  import Cookie from '@common/Cookie/Cookie'

  import AuthPage   from '@common/components/AuthPage/AuthPage.svelte'
  import Button     from '@common/components/Button/Button.svelte'

  import RegistrationPage from '../RegistrationPage/RegistrationPage.svelte'

  import ajax from '../../ajax'

  import { LOGIN_HASH_COOKIE_NAME } from '../../definitions'

  let currentlyDisplayed: 'login' | 'registration' = 'login'

  let isError = false
  let email: string
  let password: string

  /** Regisztrálás gomb eseménykezelője. */
  function onClickRegistration (): void {
    isError = false
    currentlyDisplayed = 'registration'
  }

  /**
   * Form elsütésének kezelője.
   * @param e - A kiváltó esemény.
   */
  async function onSubmit (e: Event): Promise<void> {
    e.preventDefault()

    const loginHash = await ajax.login({ email,  password })

    // Ha kaptunk vissza loginHasht, akkor rendben vagyunk.
    if (!loginHash) {
      isError = true

      return
    }

    Cookie.set(Cookie.make({
      name: LOGIN_HASH_COOKIE_NAME,
      value: loginHash,
      daysToLive: 1,
      domain: 'localhost',
      isSecure: false,
      path: '/'
    }))

    window.location.reload()
  }

</script>

{#if currentlyDisplayed === 'login'}
  <AuthPage
    bind:email
    bind:password
    bind:isError
    { onSubmit }
  >
    <div slot="content">
      <div class="col-sm-12 text-center mt-3">
        <Button
          btnType="button"
          className="btn-secondary"
          onClick={ onClickRegistration }
        >
          Regisztráció
        </Button>
      </div>
    </div>
  </AuthPage>

{:else}
  <RegistrationPage
    onReturn={ () => {
      currentlyDisplayed = 'login'
    } }
  />
{/if}
