<script
  lang="ts"
  strictEvents
>
  import getRandomLetters from '@common/utils/getRandomLetters'

  export let title: string

  const ID_LENGTH = 10

  const headingId = getRandomLetters(ID_LENGTH)
  const bodyId    = getRandomLetters(ID_LENGTH)
</script>

<div class="accordion">
  <div class="accordion-item">
    <h2
      id={ headingId }
      class="accordion-header">
      <button
        class="accordion-button collapsed"
        data-bs-toggle="collapse"
        data-bs-target={ bodyId }
        aria-controls={ bodyId }
        aria-expanded="false"
        type="button"
      >
        {title}
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
