<script
  lang="ts"
  strictEvents
>
  function defaultOnClick (): void { /***/ }

  export let btnType: 'submit' | 'button' = 'button'
  export let className  = ''
  export let color      = ''
  export let onClick: (...e: Event[]) => Promise<void> | void = defaultOnClick
</script>

<button
  class="btn { className }"
  style:color
  on:click={ onClick }
  type={ btnType }
>
  <slot />
</button>
