<script
  lang="ts"
  strictEvents
>
  import type { TFormErrors } from '@common/definitions'

  import Button     from '@common/components/Button/Button.svelte'
  import FormInput  from '@common/components/FormInput/FormInput.svelte'

  export let width: string
  export let length: string
  export let depth: string
  export let onSubmit: (e: Event) => Promise<void> | void
  export let formErrors: TFormErrors
</script>

<form on:submit={ onSubmit }>
  <div class="col-sm-12 col-md-6 mx-auto">
    <FormInput
      bind:formErrors
      bind:value={ width }
      autocomplete="off"
      label="Szélesség"
      name="width"
      placeholder="Szélesség (centiméterben megadva)"
      type="text"
    />
  </div>

  <div class="col-sm-12 col-md-6 mx-auto">
    <FormInput
      bind:formErrors
      bind:value={ length }
      autocomplete="off"
      label="Hosszaság"
      name="length"
      placeholder="Hosszaság (centiméterben megadva)"
      type="text"
    />
  </div>

  <div class="col-sm-12 col-md-6 mx-auto">
    <FormInput
      bind:formErrors
      bind:value={ depth }
      autocomplete="off"
      label="Mélység"
      name="depth"
      placeholder="Mélység (centiméterben megadva)"
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
