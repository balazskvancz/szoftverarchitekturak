<script
  lang="ts"
  strictEvents
>
  import getRandomLetters from '@common/utils/getRandomLetters'

  export let title: string

  const ID_LENGTH = 10

  const HEADING_ID = getRandomLetters(ID_LENGTH)
  const BODY_ID    = getRandomLetters(ID_LENGTH)
</script>

<div class="accordion">
  <div class="accordion-item">
    <h2
      id={ HEADING_ID }
      class="accordion-header">
      <button
        class="accordion-button collapsed"
        data-bs-toggle="collapse"
        data-bs-target={ `#${ BODY_ID }` }
        aria-controls={ BODY_ID }
        aria-expanded="false"
        type="button"
      >
        {title}
      </button>
    </h2>
    <div
      id={ BODY_ID }
      class="accordion-collapse collapse"
      aria-labelledby={ HEADING_ID }
    >
      <div class="accordion-body">
        <slot />
      </div>
    </div>
  </div>
</div>
