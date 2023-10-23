import type { IContext } from '../Router/definitions'

/**
 * Minden szolgáltatást érintő API Gateway által meghívott életjel végpont.
 * @param ctx - A kontextus.
 */
export default async function healthCheckCallback (ctx: IContext): Promise<void> {
  await Promise.resolve()
  ctx.sendOk()
}
