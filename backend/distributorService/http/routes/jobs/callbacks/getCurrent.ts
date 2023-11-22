import Communicator from '@backend/Communicator/Communicator'
import type {
  IContext,
  TCallbackFunction
} from '@common/Router/definitions'

import Validator from '@common/Validator/Validator'

import Error from '@distributorService/Error'

import { EBindValue } from '@distributorService/definitions'
import type { IUser, IGetCurrentJobResponse } from '@distributorService/definitions'

import type { IService } from '@distributorService/getServices'

/**
 * A jelenleg hozzárendelt munka lekérdezése.
 * @param services - Services.
 */
export default function getCurrent (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const user = ctx.getBindedValue<IUser>(EBindValue.User)

    if (!Validator.isDefined(user)) {
      ctx.sendError({
        code: Error.codes.ERR_USER_NOT_AUTHENTICATED,
        message: Error.messages.ERR_USER_NOT_AUTHENTICATED
      })

      return
    }

    const currentJob = await services.packageDistributions.getCurrentlyWorking(user.id)

    if (Validator.isNull(currentJob)) {
      const data: IGetCurrentJobResponse = {
        currentJob: null
      }

      ctx.sendJson(data)

      return
    }

    const packageToDealWith = await Communicator.getPackageById(currentJob.packageId)

    if (Validator.isNull(packageToDealWith)) {
      const data: IGetCurrentJobResponse = {
        currentJob: null
      }

      ctx.sendJson(data)

      return
    }

    const data: IGetCurrentJobResponse = {
      currentJob: {
        action: currentJob.action,
        package: packageToDealWith,
        jobId: currentJob.id
      }
    }

    ctx.sendJson(data)
  }
}
