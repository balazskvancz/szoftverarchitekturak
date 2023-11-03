<script lang="ts">
  import getRandomLetters from '@common/utils/getRandomLetters'

  export let title: string

  const headingId = getRandomLetters(10)
  const bodyId    = getRandomLetters(10)
</script>

<div class="accordion">
  <div class="accordion-item">
    <h2 class="accordion-header" id={ headingId }>
      <button
        class="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target={ `#${ bodyId }` }
        aria-expanded="false"
        aria-controls={ bodyId }
      >
        { title }
      </button>
    </h2>
    <div
      id={ bodyId }
      class="accordion-collapse collapse"
      aria-labelledby={ headingId }
    >
      <div class="accordion-body">
        <slot />
      </div>
    </div>
  </div>
</div>
