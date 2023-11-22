import type { IContext, TCallbackFunction } from '@common/Router/definitions'

import Validator from '@common/Validator/Validator'

import type { IService } from '@packageService/getServices'

import type { IUser, IInsertPackageRequest }  from '@packageService/definitions'
import { EBindValue } from '@packageService/definitions'

import Error from '@packageService/Error'

import validatePostData from './utils/validatePostData'
import GeoApify from '@common/GeoApify/GeoApify'

/**
 * Egy új csomag felvételét megvalósító végpont.
 * @param services - Services.
 */
export default function insert (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const user = ctx.getBindedValue<IUser>(EBindValue.User)

    if (!Validator.isDefined(user)) {
      ctx.sendError({
        code: Error.codes.ERR_USER_NOT_AUTHENTICATED,
        message: Error.messages.ERR_USER_NOT_AUTHENTICATED
      })

      return
    }

    const postData = ctx.getBody<IInsertPackageRequest>()

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

    const addressDetails = await GeoApify.search({
      city: postData.dest.city,
      country: postData.dest.country,
      housenumber: postData.dest.house,
      postcode: postData.dest.postalCode,
      street: postData.dest.street
    })

    if (Validator.isNull(addressDetails)) {
      ctx.sendError({
        code: Error.codes.ERR_INVALID_ADDRESS,
        message: Error.messages.ERR_INVALID_ADDRESS
      })

      return
    }

    // Be kell szúrni az adatbázisba a cél címet.
    const destAddressId = await services.addresses.insert({
      ...postData.dest,

      latitude: addressDetails.lat,
      longitude: addressDetails.lon
    })

    if (!Validator.isPositiveNumber(destAddressId)) {
      ctx.sendError({
        code: Error.codes.ERR_DB_INSERT,
        message: Error.messages.ERR_DB_INSERT
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

    const insertedId = await services.packages.insert({
      ...postData,
      senderId: user.id,
      destAddressId // Az újonnan beszúrt szállítási cím azonosítója.
    })

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
      userId: user.id
    })

    ctx.sendOk()
  }
}
