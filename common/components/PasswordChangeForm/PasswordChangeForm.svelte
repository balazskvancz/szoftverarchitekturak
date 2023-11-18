<script
  lang="ts"
  strictEvents
>
  import Button     from '../Button/Button.svelte'
  import FormInput  from '../FormInput/FormInput.svelte'

  import type { TFormErrors } from '../../definitions'

  export let currentPassword: string
  export let password: string
  export let passwordRepeat: string
  export let onSubmit: (e: Event) => Promise<void> | void
  export let formErrors: TFormErrors = []

</script>

<form on:submit={ onSubmit }>
  <h3>Alapadatok</h3>

  <div class="col-sm-12 col-md-6 mx-auto">
    <FormInput
      bind:formErrors
      bind:value={ currentPassword }
      autocomplete="off"
      label="Jelenlegi jelszó"
      name="currentPassword"
      placeholder=""
      type="password"
    />
  </div>

  <div class="col-sm-12 col-md-6 mx-auto">
    <FormInput
      bind:formErrors
      bind:value={ password }
      autocomplete="off"
      label="Új jelszó"
      name="password"
      placeholder=""
      type="password"
    />
  </div>

  <div class="col-sm-12 col-md-6 mx-auto">
    <FormInput
      bind:formErrors
      bind:value={ passwordRepeat }
      autocomplete="off"
      label="Új jelszó mégegyszer"
      name="passwordRepeat"
      placeholder=""
      type="password"
    />
  </div>

  <hr class="my-3" />

  <div class="col text-center">
    <Button
      btnType="submit"
      className="btn-success btn-lg"
    >
      Mentés
    </Button>
  </div>
</form>
