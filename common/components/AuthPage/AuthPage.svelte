<script
  lang="ts"
  strictEvents
>
  export let email: string
  export let password: string

  export let onSubmit: (e: Event) => Promise<void>
</script>

<div class="auth-page">
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

<style>
  .auth-page {
    display: flex;
    align-items: center;
    background-color: #f5f5f5;
    min-height: 100vh;
  }

  .form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
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
