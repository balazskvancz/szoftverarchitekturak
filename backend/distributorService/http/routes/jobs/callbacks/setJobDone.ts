import type {
  IContext,
  TCallbackFunction
} from '@common/Router/definitions'

import Validator from '@common/Validator/Validator'

import Communicator from '@backend/Communicator/Communicator'

import Error from '@distributorService/Error'

import type {
  IUser,
  ISetJobDoneRequest,
  TPackageLifeCycleAction
} from '@distributorService/definitions'

import {
  EBindValue,
  JOB_RESULTS,
  NEXT_ACTIONS_ON_RESULT
} from '@distributorService/definitions'

import type { IService } from '@backend/distributorService/getServices'

/**
 * Egy adott feladat végét beállító végpont.
 * @param services - Services.
 */
export default function setJobDone (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const { id } = ctx.getRouteParams()

    if (!Validator.isPositiveNumber(id)) {
      ctx.sendError({
        code: Error.codes.ERR_WRONG_PARAM,
        message: Error.messages.ERR_WRONG_PARAM
      })

      return
    }

    const user = ctx.getBindedValue<IUser>(EBindValue.User)

    if (!Validator.isDefined(user)) {
      ctx.sendError({
        code: Error.codes.ERR_USER_NOT_AUTHENTICATED,
        message: Error.messages.ERR_USER_NOT_AUTHENTICATED
      })

      return
    }

    const postData = ctx.getBody<ISetJobDoneRequest>()

    if (!Validator.isDefined(postData)) {
      ctx.sendError({
        code: Error.codes.ERR_WRONG_POSTDATA,
        message: Error.messages.ERR_WRONG_POSTDATA
      })

      return
    }

    const { result } = postData

    if (!Validator.isOneOf(result, ...JOB_RESULTS)) {
      ctx.sendError({
        code: Error.codes.ERR_WRONG_POSTDATA,
        message: Error.messages.ERR_WRONG_POSTDATA
      })

      return
    }

    const job = await services.packageDistributions.getById(id)

    if (Validator.isNull(job)) {
      ctx.sendError({
        code: Error.codes.ERR_JOB_NOT_EXISTS,
        message: Error.messages.ERR_JOB_NOT_EXISTS
      })

      return
    }

    // Fontos ellenőrízni, hogy ténylegesen az adott user-hez tartozik-e a csomag.
    if (job.courierId !== user.id) {
      ctx.sendError({
        code: Error.codes.ERR_JOB_NOT_BELONGS_TO_USER,
        message: Error.messages.ERR_JOB_NOT_BELONGS_TO_USER
      })

      return
    }

    const action: TPackageLifeCycleAction = NEXT_ACTIONS_ON_RESULT[result][job.action]

    const error = await Communicator.insertPackageLifeCycle({
      action,
      packageId: job.packageId,
      userId: job.courierId
    })

    // Ha volt hiba, akkor azt propagáljuk.
    if (!Validator.isNull(error)) {
      ctx.sendError(error)

      return
    }

    // Legvégül pedig a magát a feladatot készre állítjuk.
    await services.packageDistributions.setDone(id)

    ctx.sendOk()
  }
}
