<script
  lang="ts"
  strictEvents
>
  import Button     from '@common/components/Button/Button.svelte'
  import FormInput  from '@common/components/FormInput/FormInput.svelte'

  import type { TFormErrors } from '../../definitions'

  export let country: string
  export let postalCode: string
  export let city: string
  export let street: string
  export let house: string
  export let onSubmit: (e: Event) => Promise<void>
  export let formErrors: TFormErrors = []
</script>

<form on:submit={ onSubmit }>
  <div class="col-sm-12 col-md-6 mx-auto">
    <FormInput
      bind:formErrors
      bind:value={ country }
      autocomplete="off"
      label="Ország"
      name="country"
      placeholder="pl. Magyarorszég"
      type="text"
    />
  </div>

  <div class="col-sm-12 col-md-6 mx-auto">
    <FormInput
      bind:formErrors
      bind:value={ postalCode }
      autocomplete="off"
      label="Irányítószám"
      name="postalCode"
      placeholder="pl. 1117"
      type="text"
    />
  </div>

  <div class="col-sm-12 col-md-6 mx-auto">
    <FormInput
      bind:formErrors
      bind:value={ city }
      autocomplete="off"
      label="Város"
      name="city"
      placeholder="pl. Budapest"
      type="text"
    />
  </div>

  <div class="col-sm-12 col-md-6 mx-auto">
    <FormInput
      bind:formErrors
      bind:value={ street }
      autocomplete="off"
      label="Utca"
      name="street"
      placeholder="pl. Váczi utca"
      type="text"
    />
  </div>

  <div class="col-sm-12 col-md-6 mx-auto">
    <FormInput
      bind:formErrors
      bind:value={ house }
      autocomplete="off"
      label="Házszám"
      name="house"
      placeholder="pl. 5/a"
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
