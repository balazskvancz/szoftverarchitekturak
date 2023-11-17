import type {
  IContext,
  TCallbackFunction
} from '@common/Router/definitions'

import type { IService } from '@backend/packageService/getServices'

import Error      from '@backend/packageService/Error'
import Validator  from '@backend/packageService/Validator'
import type { IGetPackageLifeCyclesResponse } from '@backend/packageService/definitions'

/**
 * Egy adott csomag élettörténetét visszaadó végpont.
 * @param services - Services.
 */
export default function GetLifeCycles (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const { id } = ctx.getRouteParams()

    if (!Validator.isPositiveNumber(id)) {
      ctx.sendError({
        code: Error.codes.ERR_WRONG_PARAM,
        message: Error.messages.ERR_WRONG_PARAM
      })

      return
    }

    const lifeCycles = await services.packageLifecycles.getAll(id, 'desc')

    if (!Validator.isNonEmptyArray(lifeCycles)) {
      ctx.sendError({
        code: Error.codes.ERR_PACKAGE_NOT_EXISTS,
        message: Error.messages.ERR_PACKAGE_NOT_EXISTS
      })

      return
    }

    const data: IGetPackageLifeCyclesResponse = {
      lifeCycles
    }

    ctx.sendJson(data)
  }
}
