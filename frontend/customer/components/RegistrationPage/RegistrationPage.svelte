<script
  lang="ts"
  strictEvents
>
  import Button     from '@common/components/Button/Button.svelte'
  import Card       from '@common/components/Card/Card.svelte'
  import FormInput  from '@common/components/FormInput/FormInput.svelte'

  import ajax from '../../ajax'

  import type { TFormErrors } from '../../definitions'

  export let onReturn: () => void

  let name: string
  let email: string
  let telephone: string
  let password: string
  let passwordRepeat: string

  let formErrors: TFormErrors = []

  /**
   * Form elsütésének kezelője.
   * @param e - A kiváltó esemény.
   */
  async function onSubmit (e: Event): Promise<void> {
    e.preventDefault()

    const error = await ajax.registration({
      email,
      name,
      password,
      passwordRepeat,
      telephone
    })

    formErrors = error ? error.formErrors ?? [] : []

    if (formErrors.length === 0) {
      // TODO: handleSuccess

      onReturn()
    }
  }
</script>

<div class="container mx-auto mt-5">
  <Card>
    <div
      class="p-3"
      slot="header">
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <h3>Regisztráció</h3>
        </div>

        <div class="col-sm-12 col-md-6 text-end">
          <Button
            btnType="button"
            className="btn-secondary"
            onClick={ onReturn }
          >
            Visszalépés
          </Button>
        </div>
      </div>
    </div>

    <form
      on:submit={ onSubmit }
      slot="body"
    >
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

      <div class="col-sm-12 col-md-6 mx-auto">
        <FormInput
          bind:formErrors
          bind:value={ telephone }
          autocomplete="off"
          label="Telefonszám"
          name="telephone"
          placeholder="+36 20 123 4567"
          type="text"
        />
      </div>

      <div class="col-sm-12 col-md-6 mx-auto">
        <FormInput
          bind:formErrors
          bind:value={ password }
          autocomplete="off"
          label="Jelszó"
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
          label="Jelszó megismétlése"
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

  </Card>
</div>
