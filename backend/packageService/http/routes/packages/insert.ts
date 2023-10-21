import type { IContext, TCallbackFunction } from '@common/Router/definitions'

import Validator from '@common/Validator/Validator'

import type { IService }      from '../../../getServices'
import type { IBasePackage }  from '../../../definitions'

import Error from '../../../Error'

import validatePostData from './utils/validatePostData'

/**
 * Egy új csomag felvételét megvalósító végpont.
 * @param services - Services.
 */
export default function insert (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const postData = ctx.getBody<IBasePackage>()

    if (!Validator.isDefined(postData)) {
      ctx.sendError({
        code: Error.codes.ERR_WRONG_POSTDATA,
        message: Error.messages.ERR_WRONG_POSTDATA
      })

      return
    }

    const formErrors = validatePostData(postData)

    if (Validator.isNonEmptyArray(formErrors)) {
      ctx.sendError({
        code: Error.codes.ERR_WRONG_POSTDATA,
        formErrors
      })

      return
    }

    // Le kell vizsgálni, hogy a megadott felvételi cím
    // azonosító egy tényleges címet jelöl-e.
    const pickUpAddress = await services.addresses.getById(postData.pickUpAddressId)

    if (Validator.isNull(pickUpAddress)) {
      ctx.sendError({
        code: Error.codes.ERR_ADDRESS_NOT_EXISTS,
        message: Error.messages.ERR_ADDRESS_NOT_EXISTS
      })

      return
    }

    // Ugyanezt meg kell tenni a szállítási címre is.
    const destinationAddress = await services.addresses.getById(postData.destAddressId)

    if (Validator.isNull(destinationAddress)) {
      ctx.sendError({
        code: Error.codes.ERR_ADDRESS_NOT_EXISTS,
        message: Error.messages.ERR_ADDRESS_NOT_EXISTS
      })

      return
    }

    // Éééés a csomag dimenziójára is.
    const dimension = await services.dimensions.getById(postData.dimensionId)

    if (Validator.isNull(dimension)) {
      ctx.sendError({
        code: Error.codes.ERR_DIMENSION_NOT_EXISTS,
        message: Error.messages.ERR_DIMENSION_NOT_EXISTS
      })

      return
    }

    const insertedId = await services.packages.insert(postData)

    if (insertedId <= 0) {
      ctx.sendError({
        code: Error.codes.ERR_DB_INSERT,
        message: Error.messages.ERR_DB_INSERT
      })

      return
    }

    // Ne felejtsük el az első életciklus eseményt beszúrni.
    await services.packageLifecycles.insert({
      action: 'created',
      packageId: insertedId,
      userId: postData.senderId
    })

    ctx.sendOk()
  }
}
