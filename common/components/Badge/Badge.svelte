<script lang="ts">
  import type { TState } from '../definitions'

  export let state: TState
  export let isRounded: boolean = false
  export let isWrapped: boolean = false

  const classes: string = [
    'badge',
    `bg-${ state }`,
    isRounded ? 'rounded-pill' : '',
    isWrapped ? 'text-wrap' : '',
  ].join(' ')
</script>

<span class={ classes }>
  <slot />
</span>
