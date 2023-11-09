<script
  lang="ts"
  strictEvents
>
  import Button         from '@common/components/Button/Button.svelte'
  import DashboardCard  from '@common/components/DashboardCard/DashboardCard.svelte'
</script>

<DashboardCard pageTitle="Felhasználók">
  <div slot="content">
    <div class="col-sm-12 text-end">
      <Button
        btnType="button"
        className="btn-primary"
      >
        Új felhasználó felvétele
      </Button>

      <hr class="my-3" />
    </div>
  </div>
</DashboardCard>
