<script
  lang="ts"
  strictEvents
>
  import Alert from '../Alert/Alert.svelte'

  import styles from './AuthPage.css'

  export let email: string
  export let password: string
  export let isError = false

  export let onSubmit: (e: Event) => Promise<void>
</script>

<div class={ styles.authPage }>
  <div class="login-form">
    <div class="form-signin">
      {#if isError}
        <Alert alertType="danger">
          Sikertelen bejelentkezés!
        </Alert>
      {/if}

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
          <label for="floatingInput">Felhasználónév</label>
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
          class="w-100 btn btn-lg btn-primary submitButton mt-3"
          on:submit={ onSubmit }
          type="submit"
        >
          <i class="bi bi-unlock lock" />
        </button>

      </form>
    </div>
  </div>
</div>

<style>
  .form-signin {
    width: 100%;
    max-width: 430px;
    padding: 15px;
    margin: 1.2rem;
  }

  .form-signin .form-floating:focus-within {
    z-index: 2;
  }

  .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  .lock {
    color: #FFF;
    font-size: 1.6rem;

  }
</style>
