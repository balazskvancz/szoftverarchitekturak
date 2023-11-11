<script
  lang="ts"
  strictEvents
>
  import { Route, Router } from 'svelte-routing'

  import AdminsPage     from './components/AdminsPage/AdminsPage.svelte'
  import CouriersPage   from './components/CouriersPage/CouriersPage.svelte'
  import CustomersPage  from './components/CustomersPage/CustomersPage.svelte'
  import DimensionsPage from './components/DimensionsPage/DimensionsPage.svelte'

  import { PAGE_LINKS } from './definitions'

</script>

<Router>
  <Route path={ PAGE_LINKS.dimensions.url }>
    <DimensionsPage />
  </Route>

  <Route path={ PAGE_LINKS.customers.url }>
    <CustomersPage />
  </Route>

  <Route path={ PAGE_LINKS.admins.url }>
    <AdminsPage />
  </Route>

  <Route path={ PAGE_LINKS.couriers.url }>
    <CouriersPage />
  </Route>
</Router>
