<script
  lang="ts"
  strictEvents
>
  import { onMount } from 'svelte'

  import DashboardCard  from '@common/components/DashboardCard/DashboardCard.svelte'
  import Loading        from '@common/components/Loading/Loading.svelte'

  import ajax from '../../ajax'

  import JobsCard from '../JobsCard/JobsCard.svelte'

  let isWorkingDay  = false
  let isLoaded      = false

  onMount(async () => {
    isWorkingDay = await ajax.isWorkingDay()
    isLoaded      = true
  })

</script>

{#if isLoaded}
  <DashboardCard pageTitle="Csomagok">
    <div slot="content">
      <hr class="my-3" />
      {#if isWorkingDay}
        <JobsCard />
      {:else}
        <div class="col-sm-12 p-5 mt-4 text-center">
          <h2>A mai napon nem dolgozol!</h2>
        </div>
      {/if}
    </div>
  </DashboardCard>
{:else}
  <Loading />
{/if}
