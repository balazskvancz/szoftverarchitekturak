<script
  lang="ts"
  strictEvents
>
  import type { IPackageLifeCycle } from '../../definitions'
  import { PACKAGE_LIFE_CYCLE_ACTION_NAMES } from '../../definitions'

  export let data: IPackageLifeCycle

  const { action, createdAt } = data

  const actionName = PACKAGE_LIFE_CYCLE_ACTION_NAMES[action]
</script>

<tr>
  <td class="align-middle">{createdAt}</td>
  <td class="align-middle">{actionName}</td>
</tr>
