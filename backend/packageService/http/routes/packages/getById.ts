import type {
  IContext,
  TCallbackFunction
} from '@common/Router/definitions'

import type { IGetPackageByIdResponse } from '@packageService/definitions'

import Error      from '@packageService/Error'
import Validator  from '@packageService/Validator'

import type { IService } from '@backend/packageService/getServices'

/**
 * Azonosító szerinti lekérdezés.
 * @param services - Services.
 */
export default function getById (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const { id } = ctx.getRouteParams()

    if (!Validator.isPositiveNumber(id)) {
      ctx.sendError({
        code: Error.codes.ERR_WRONG_PARAM,
        message: Error.messages.ERR_WRONG_PARAM
      })

      return
    }

    const packageEntity = await services.packages.getById(id)

    if (Validator.isNull(packageEntity)) {
      ctx.sendError({
        code: Error.codes.ERR_PACKAGE_NOT_EXISTS,
        message: Error.messages.ERR_PACKAGE_NOT_EXISTS
      })

      return
    }

    const lifeCycles = await services.packageLifecycles.getAll(id, 'desc')

    const data: IGetPackageByIdResponse = {
      digestPackage: {
        ...packageEntity,

        lifeCycles
      }
    }

    ctx.sendJson(data)
  }
}
