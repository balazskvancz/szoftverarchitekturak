<script
  lang="ts"
  strictEvents
>
  import { Route, Router } from 'svelte-routing'

  import DimensionsPage from './components/DimensionsPage/DimensionsPage.svelte'
  import UsersPage from './components/UsersPage/UsersPage.svelte'

  import { PAGE_LINKS } from './definitions'

</script>

<Router>
  <Route path={ PAGE_LINKS.dimensions.url }>
    <DimensionsPage />
  </Route>

  <Route path={ PAGE_LINKS.users.url }>
    <UsersPage />
  </Route>
</Router>
