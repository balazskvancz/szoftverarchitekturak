import type { IContext, TCallbackFunction } from '@common/Router/definitions'

import Validator from '@common/Validator/Validator'

import type { IBaseDimension }  from '@packageService/definitions'
import type { IService }        from '@packageService/getServices'

import Error from '@packageService/Error'

import validatePostData from './utils/validatePostData'

/**
 * Egy dimenzió módosítását megvalósító végpont.
 * @param services - Services.
 */
export default function update (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const { id } = ctx.getRouteParams()

    if (!Validator.isPositiveNumber(id)) {
      ctx.sendError({
        code: Error.codes.ERR_WRONG_PARAM,
        message: Error.messages.ERR_WRONG_PARAM
      })

      return
    }

    const postData = ctx.getBody<IBaseDimension>()

    if (!Validator.isDefined(postData)) {
      ctx.sendError({
        code: Error.codes.ERR_WRONG_POSTDATA,
        message: 'Hiányzó postData!'
      })

      return
    }

    // A strukturális validációt egy külső függvényre bízzuk.
    const formErrors = validatePostData(postData)

    if (Validator.isNonEmptyArray(formErrors)) {
      ctx.sendError({
        code: Error.codes.ERR_WRONG_POSTDATA,
        formErrors
      })

      return
    }

    const isUpdated = await services.dimensions.update(id, postData)

    // Valamiért sikertelen volt a beszúrás.
    if (!isUpdated) {
      ctx.sendError({
        code: Error.codes.ERR_DB_UPDATE,
        message: Error.messages.ERR_DB_UPDATE
      })

      return
    }

    ctx.sendOk()
  }
}
