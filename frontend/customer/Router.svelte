<script
  lang="ts"
  strictEvents
>
  import { Route, Router } from 'svelte-routing'

  import AddressesPage  from './components/AddressesPage/AddressesPage.svelte'
  import PackagesPage   from './components/PackagesPage/PackagesPage.svelte'
  import SettingsPage   from './components/SettingsPage/SettingsPage.svelte'

  import { PAGE_LINKS } from './definitions'

</script>

<Router>
  <Route path={ PAGE_LINKS.addresses.url }>
    <AddressesPage />
  </Route>

  <Route path={ PAGE_LINKS.settings.url }>
    <SettingsPage />
  </Route>

  <Route path={ PAGE_LINKS.packages.url }>
    <PackagesPage />
  </Route>
</Router>
