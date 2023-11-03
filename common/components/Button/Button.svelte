<script lang="ts">
  function defaultOnClick(): void {}

  export let btnType: 'submit' | 'button' = 'button'
  export let className  = ''
  export let color      = ''
  export let onClick: (...e: Event[]) => Promise<void> | void = defaultOnClick
</script>

<button
  type={ btnType }
  class={ `btn ${ className }` }
  style:color={ color }
  on:click={ onClick }
>
  <slot />
</button>
