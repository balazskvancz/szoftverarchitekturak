<script
  lang="ts"
  strictEvents
>
  import Button     from '@common/components/Button/Button.svelte'
  import FormInput  from '@common/components/FormInput/FormInput.svelte'

  import type { TFormErrors } from '../../definitions'

  export let name: string
  export let email: string
  export let formErrors: TFormErrors
  export let onSubmit: (e: Event) => Promise<void>
</script>

<form on:submit={ onSubmit }>
  <div class="col-sm-12 col-md-6 mx-auto">
    <FormInput
      bind:formErrors
      bind:value={ name }
      autocomplete="off"
      label="Név"
      name="name"
      placeholder="Teszt Elek"
      type="text"
    />
  </div>

  <div class="col-sm-12 col-md-6 mx-auto">
    <FormInput
      bind:formErrors
      bind:value={ email }
      autocomplete="off"
      label="E-mail cím"
      name="email"
      placeholder="example@example.com"
      type="text"
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
