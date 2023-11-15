<script
  lang="ts"
  strictEvents
>
  import Cookie from '@common/Cookie/Cookie'

  import AuthPage from '@common/components/AuthPage/AuthPage.svelte'

  import ajax from '../../ajax'

  import { LOGIN_HASH_COOKIE_NAME } from '../../definitions'

  let isError = false
  let email: string
  let password: string

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

<AuthPage
  bind:email
  bind:password
  bind:isError
  { onSubmit }
/>
