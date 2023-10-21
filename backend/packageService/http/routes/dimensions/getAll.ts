import type {
  IContext,
  TCallbackFunction
} from '@common/Router/definitions'

import type { IGetAllDimensionsResponse } from '../../../definitions'

import type { IService } from '../../../getServices'

/**
 * Az összes felvett dimenzió lekérdezését megvalósító végpont.
 * @param services - Services.
 */
export default function getAll (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const dimensions = await services.dimensions.getAll()

    const data: IGetAllDimensionsResponse = {
      dimensions
    }

    ctx.sendJson(data)
  }
}
