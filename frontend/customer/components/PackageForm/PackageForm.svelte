<script
  lang="ts"
  strictEvents
>
  import Button     from '@common/components/Button/Button.svelte'
  import Card       from '@common/components/Card/Card.svelte'
  import FormInput  from '@common/components/FormInput/FormInput.svelte'
  import Select     from '@common/components/Select/Select.svelte'

  import type { TSelectValues } from '@common/components/definitions'

  import type { TAddresses, TDimensions, TFormErrors } from '../../definitions'

  // Cím adatai.
  export let country: string
  export let postalCode: string
  export let city: string
  export let street: string
  export let house: string

  // Csomag súlya, címzett egyéb adatai.
  export let weight: string
  export let receiverName: string
  export let receiverEmail: string

  // Kiválasztott felvételi cím és csomag dimenzió.
  export let selectedAddress: string
  export let selectedDimension: string

  export let onSubmit: (e: Event) => Promise<void>
  export let formErrors: TFormErrors = []
  export let addresses: TAddresses
  export let dimensions: TDimensions

  let addressSelectItems: TSelectValues = []
  $: addressSelectItems = addresses.map(({ id, city, street, house }) => ({
    value: id.toString(),
    text: `${ city } ${ street } ${ house }`
  }))

  let dimensionSelectItems: TSelectValues = []
  $: dimensionSelectItems = dimensions.map(({ id, depth, length, width }) => ({
    value: id.toString(),
    text: `${ width }x${ length }x${ depth }`
  }))
</script>

<form on:submit={ onSubmit }>
  <div class="col-sm-12 col-md-6 mx-auto">
    <Select
      bind:formErrors
      bind:value={ selectedAddress }
      label="Felvételi cím"
      name="pickUpAddressId"
      values={ addressSelectItems }
    />
  </div>

  <div class="col-sm-12 col-md-6 mx-auto">
    <Select
      bind:formErrors
      bind:value={ selectedDimension }
      label="Csomag dimenzió"
      name="dimensionId"
      values={ dimensionSelectItems }
    />
  </div>

  <div class="col-sm-12 col-md-6 mx-auto">
    <FormInput
      bind:formErrors
      bind:value={ weight }
      autocomplete="off"
      label="Csomag súlya"
      name="weight"
      placeholder="pl. 5"
      type="text"
    />
  </div>

  <div class="col-sm-12 col-md-6 mx-auto">
    <FormInput
      bind:formErrors
      bind:value={ receiverName }
      autocomplete="off"
      label="Címzett neve"
      name="receiverName"
      placeholder="pl. Teszt Elek"
      type="text"
    />
  </div>

  <div class="col-sm-12 col-md-6 mx-auto">
    <FormInput
      bind:formErrors
      bind:value={ receiverEmail }
      autocomplete="off"
      label="Címzett e-mail címe"
      name="receiverEmail"
      placeholder="pl. teszt@teszt.hu"
      type="text"
    />
  </div>

  <Card>
    <div slot="body">
      <div class="col-sm-12 text-start">
        <h3>Cím adatai</h3>
      </div>

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
    </div>
  </Card>

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
