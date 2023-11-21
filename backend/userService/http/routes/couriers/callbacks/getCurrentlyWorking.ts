import type {
  IContext,
  TCallbackFunction
} from '@common/Router/definitions'

import Validator from '@common/Validator/Validator'

import { getDate } from '@common/utils/dateAndTime'

import type {
  IGetCurrentlyWorkingCouriersResponse
} from '@userService/definitions'

import type { IService } from '@backend/userService/getServices'

/**
 * Az összes dolgozó futár lekérdezése végpont.
 * @param services - Services.
 */
export default function getCurrentlyWorking (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const date = getDate(Date.now())

    const workingDays = await services.courierWorkingDays.getByDate(date)

    if (!Validator.isNonEmptyArray(workingDays)) {
      const data: IGetCurrentlyWorkingCouriersResponse = {
        couriers: []
      }

      ctx.sendJson(data)

      return
    }

    const courierIds = workingDays.map(({ userId }) => userId)

    const couriers = await services.couriers.getByIds(courierIds)

    const data: IGetCurrentlyWorkingCouriersResponse = {
      couriers
    }

    ctx.sendJson(data)
  }
}
