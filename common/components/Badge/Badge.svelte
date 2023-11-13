<script
  lang="ts"
  strictEvents
>
  import type { TState } from '../definitions'

  export let state: TState
  export let isRounded = false
  export let isWrapped = false

  const classes: string = [
    'badge',
    `bg-${ state }`,
    isRounded ? 'rounded-pill' : '',
    isWrapped ? 'text-wrap' : ''
  ].join(' ')
</script>

<span class={ classes }>
  <slot />
</span>
