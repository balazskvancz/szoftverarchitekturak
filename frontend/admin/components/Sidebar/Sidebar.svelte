<script
  lang="ts"
  strictEvents
>
  import { navigate } from 'svelte-routing'

  import { Object } from '@common/Object/Object'

  import type { TPage } from '../../definitions'

  import { PAGE_LINKS } from '../../definitions'

  /**
   * Egy adott oldalra való kattintás eseménykezelője.
   * @param target - A cél.
   */
  function onClickItem (target: TPage): void {
    const pageLink = PAGE_LINKS[target]

    navigate(pageLink.url)
  }
</script>

<nav class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse h-100">
  <div class="position-sticky pt-3">
    <ul class="nav flex-column">
      {#each Object.getEntries(PAGE_LINKS) as [ key, value ] (key)}
        <li class="nav-item">
          <button
            class="btn nav-link link"
            on:click={ () => onClickItem(key) }
            aria-disabled="true"
            tabindex="-1"
            type="button"
          >
            <i class={ value.icon } /> {value.displayName}
          </button>
        </li>
      {/each}

      <hr class="my-3" />
    </ul>
  </div>
</nav>

<style>
  .link {
    color: #333;
  }
</style>
