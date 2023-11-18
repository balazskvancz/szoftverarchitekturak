<script
  lang="ts"
  strictEvents
>
  import Button     from '../Button/Button.svelte'
  import FormInput  from '../FormInput/FormInput.svelte'

  import type { TFormErrors } from '../../definitions'

  export let name: string
  export let email: string
  export let telephone: string | null
  export let onSubmit: (e: Event) => Promise<void> | void
  export let formErrors: TFormErrors = []

</script>

<form on:submit={ onSubmit }>
  <h3>Alapadatok</h3>

  <div class="col-sm-12 col-md-6 mx-auto">
    <FormInput
      bind:formErrors
      bind:value={ email }
      autocomplete="off"
      label="E-mail"
      name="email"
      placeholder="pl. teszt@teszt.hu"
      type="text"
    />
  </div>

  <div class="col-sm-12 col-md-6 mx-auto">
    <FormInput
      bind:formErrors
      bind:value={ name }
      autocomplete="off"
      label="name"
      name="name"
      placeholder="pl. Teszt Elek"
      type="text"
    />
  </div>

  {#if telephone}
    <div class="col-sm-12 col-md-6 mx-auto">
      <FormInput
        bind:formErrors
        bind:value={ telephone }
        autocomplete="off"
        label="Telefonszám"
        name="telephone"
        placeholder="pl. Teszt Elek"
        type="text"
      />
    </div>
  {/if}

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
