<script
  lang="ts"
  strictEvents
>
  import { onDestroy } from 'svelte'

  import DashboardCard      from '@common/components/DashboardCard/DashboardCard.svelte'
  import PasswordChangeForm from '@common/components/PasswordChangeForm/PasswordChangeForm.svelte'
  import UserDetailsForm    from '@common/components/UserDetailsForm/UserDetailsForm.svelte'

  import type { TFormErrors } from '../../definitions'

  import { onSuccessOccured } from '../../store'

  import ajax from '../../ajax'

  import { getLoggedInUser } from '../../store'

  let userId = -1

  let name: string
  let email: string
  let telephone: string | null

  let currentPassword: string
  let password: string
  let passwordRepeat: string

  let formErrors: TFormErrors = []
  let passwordFormErrors: TFormErrors = []

  /** Bejelentkezett felhasználói adatok. */
  const unsubscribeGetLoggedUser = getLoggedInUser.subscribe(async (v) => {
    if (!v) {
      return
    }

    userId = v.id

    const admin = await ajax.getAdminById(userId)

    if (!admin) {
      return
    }

    name  = admin.name
    email = admin.email
  })

  /** Sikeres esemény kezelője. */
  function handleSuccess (): void {
    onSuccessOccured.set('Sikeres művelet!')
  }

  /**
   * Felhasználói adatok form eseménykezelője.
   * @param e - A kiváltó esemény.
   */
  async function onSubmitUserDetailsForm (e: Event): Promise<void> {
    e.preventDefault()
    await Promise.resolve()

    const error = await ajax.updateAdmin(userId, {
      email,
      name
    })

    formErrors = error ? error.formErrors ?? [] : []

    if (formErrors.length === 0) {
      handleSuccess()
    }
  }

  /**
   * Jelszó megváltoztatás formja.
   * @param e - A kiváltó esemény.
   */
  async function onSubmitPasswordChangeForm (e: Event): Promise<void> {
    e.preventDefault()

    const error = await ajax.changePassword({
      currentPassword,
      password,
      passwordRepeat
    })

    passwordFormErrors = error ? error.formErrors ?? [] : []

    if (passwordFormErrors.length === 0) {
      handleSuccess()

      /* eslint-disable require-atomic-updates */
      currentPassword = ''
      password        = ''
      passwordRepeat = ''
    /* eslint-enable require-atomic-updates */
    }
  }

  onDestroy(() => {
    unsubscribeGetLoggedUser()
  })
</script>

<DashboardCard pageTitle="Beállítások">
  <div slot="content">
    <hr class="my-3" />

    <UserDetailsForm
      bind:name
      bind:email
      bind:telephone
      bind:formErrors
      onSubmit={ onSubmitUserDetailsForm }
    />

    <PasswordChangeForm
      bind:currentPassword
      bind:password
      bind:passwordRepeat
      bind:formErrors={ passwordFormErrors }
      onSubmit={ onSubmitPasswordChangeForm }
    />
  </div>
</DashboardCard>
