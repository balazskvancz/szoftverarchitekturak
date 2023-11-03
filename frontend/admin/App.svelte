<script lang="ts">
  let counter = 0
</script>

<div class="container mx-auto mt-5">
  <div class="row">
    <div class="col-sm-12 text-center">
      <h1>Számláló: { counter }</h1>
      <div class="row">

        <div class="col-sm-12 col-md-6 text-center">
          <button
            type='button'
            class="btn btn-primary"
            on:click={ () => counter++ }
          >
            Kattints rám!
          </button>
        </div>

        <div class="col-sm-12 col-md-6 text-center">
          <button
            type='button'
            class="btn btn-danger"
            on:click={ () => counter = 0 }
          >
            Visszaállítás!
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
