import type { IContext, TCallbackFunction } from '@common/Router/definitions'

import Validator from '@common/Validator/Validator'

import type { IBaseDimension }  from '../../../definitions'
import type { IService }        from '../../../getServices'

import Error from '../../../Error'

import validatePostData from './utils/validatePostData'

/**
 * Egy új dimenzió beszúrását megvalósító végpont.
 * @param services - Services.
 */
export default function insert (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
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

    const insertedId = await services.dimensions.insert(postData)

    // Valamiért sikertelen volt a beszúrás.
    if (!Validator.isPositiveNumber(insertedId)) {
      ctx.sendError({
        code: Error.codes.ERR_DB_INSERT,
        message: Error.messages.ERR_DB_INSERT
      })

      return
    }

    // Itt pedig szólunk, hogy minden rendben ment.
    // TODO: lehet, hogy kellene egy { insertedId: 1 }
    // formájú JSON válasz.
    ctx.sendOk()
  }
}
