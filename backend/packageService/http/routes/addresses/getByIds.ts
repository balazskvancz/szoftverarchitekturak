import type { IGetAddressesByIdsRequest, IGetAddressesByIdsResponse } from '@backend/packageService/definitions'
import type {
  IContext,
  TCallbackFunction
} from '@common/Router/definitions'

import Validator from '@common/Validator/Validator'

import Error from '@packageService/Error'

import type { IService } from '@packageService/getServices'

/**
 * Azonosítók szerinti tömeges elkérés.
 * @param services - Services.
 */
export default function getByIds (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const postData = ctx.getBody<IGetAddressesByIdsRequest>()

    if (!Validator.isDefined(postData)) {
      ctx.sendError({
        code: Error.codes.ERR_WRONG_POSTDATA,
        message: Error.messages.ERR_WRONG_POSTDATA
      })

      return
    }

    const { ids } = postData

    if (
      !Validator.isNonEmptyArray<number>(ids) ||
      !ids.every(Validator.isPositiveNumber)
    ) {
      ctx.sendError({
        code: Error.codes.ERR_WRONG_POSTDATA,
        message: Error.messages.ERR_WRONG_POSTDATA
      })

      return
    }

    const addresses = await services.addresses.getByIds(ids)

    const data: IGetAddressesByIdsResponse = {
      addresses
    }

    ctx.sendJson(data)
  }
}
