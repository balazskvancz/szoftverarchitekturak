<script
  lang="ts"
  strictEvents
>
  import styles from './AuthPage.css'

  export let email: string
  export let password: string

  export let onSubmit: (e: Event) => Promise<void>
</script>

<div class={ styles.authPage }>
  <div class="container">
    <div class="form-signin">
      <h1 class="h3 mb-3 fw-normal text-center">Bejelentkezés</h1>

      <form on:submit={ onSubmit }>
        <div class="form-floating">
          <input
            id="floatingInput"
            class="form-control shadow-none"
            bind:value={ email }
            placeholder="E-mail cím"
            type="text"
          />
          <label for="floatingInput">E-mail cím</label>
        </div>

        <div class="form-floating">
          <input
            id="floatingPassword"
            class="form-control shadow-none"
            bind:value={ password }
            placeholder="Jelszó"
            type="password"
          />
          <label for="floatingPassword">Jelszó</label>
        </div>

        <button
          class="w-100 btn btn-lg btn-primary submitButton"
          on:submit={ onSubmit }
          type="submit"
        >
          <i class="bi bi-unlock lock" />
        </button>

      </form>
    </div>
  </div>
</div>
