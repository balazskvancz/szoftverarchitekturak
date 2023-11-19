import type { IContext, TCallbackFunction } from '@common/Router/definitions'

import GeoApify from '@common/GeoApify/GeoApify'

import Validator from '@common/Validator/Validator'

import Error from '@packageService/Error'

import type { IBaseAddress, IInsertedIdResponse }  from '@packageService/definitions'

import type { IService } from '@packageService/getServices'

import validatePostData from './utils/validatePostData'

/**
 * Egy új cím felvételét megvalósító végpont.
 * @param services - Services.
 */
export default function insert (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const postData = ctx.getBody<IBaseAddress>()

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
        code: Error.codes.ERR_WRONG_PARAM,
        formErrors
      })

      return
    }

    const addressDetails = await GeoApify.search({
      city: postData.city,
      country: postData.country,
      housenumber: postData.house,
      postcode: postData.postalCode,
      street: postData.street
    })

    if (Validator.isNull(addressDetails)) {
      ctx.sendError({
        code: Error.codes.ERR_INVALID_ADDRESS,
        message: Error.messages.ERR_INVALID_ADDRESS
      })

      return
    }

    const insertedId = await services.addresses.insert({
      ...postData,
      latitude: addressDetails.lat,
      longitude: addressDetails.lon
    })

    if (insertedId <= 0) {
      ctx.sendError({
        code: Error.codes.ERR_DB_INSERT,
        message: Error.messages.ERR_DB_INSERT
      })

      return
    }

    const data: IInsertedIdResponse = {
      insertedId
    }

    ctx.sendJson(data)
  }
}
