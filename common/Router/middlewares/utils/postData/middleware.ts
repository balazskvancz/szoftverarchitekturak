/* eslint-disable no-restricted-globals */
import type { IContext, TCallbackFunction } from '@common/Router/definitions'

const DEFAULT_ENCODING = 'utf-8'

/**
 * Kiolvassa, parseolja és a kontextushoz adja a bejövő kérés törzsét.
 * @param ctx   - A kontextus.
 * @param next  - Next mw.
 */
export default async function middleware (ctx: IContext, next: TCallbackFunction): Promise<void> {
  const req = ctx.getNativeRequest()

  const bodyString: string = await new Promise((resolve) => {
    let body = ''

    req.setEncoding(DEFAULT_ENCODING)

    req.on('data', (
      chunk: string
    ) => {
      body = body + chunk
    })

    req.on('end', () => {
      resolve(body)
    })
  })

  try {
    const json = JSON.parse(bodyString)
    ctx.setBody(json)
  }
  catch (error) {
    ctx.setBody({})
  }

  await next(ctx)
}
