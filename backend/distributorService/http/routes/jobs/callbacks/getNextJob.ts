import type {
  IContext,
  TCallbackFunction
} from '@common/Router/definitions'

import { getDate } from '@common/utils/dateAndTime'

import Validator from '@common/Validator/Validator'

import Communicator from '@backend/Communicator/Communicator'

import Error from '@backend/distributorService/Error'

import type { IService } from '@backend/distributorService/getServices'

import { EBindValue, HEADQUARTERS_GEO_DETAILS } from '@backend/distributorService/definitions'

import type {
  IUser,
  IGetNextJobResponse
} from '@backend/distributorService/definitions'

import findSuitableJob from './utils/findSuitableJob'

/**
 * A következő feladat visszaadása az éppen bejelentkezett felhasználó számára.
 * @param services - Services.
 * @returns
 */
export default function getNexJob (services: IService): TCallbackFunction {
  /**
   * Közösített „nincs több feladat” handler.
   * @param context - A kontextus.
   */
  function noMoreJobsHandler (context: IContext): void {
    const data: IGetNextJobResponse = {
      nextJob: null
    }

    context.sendJson(data)
  }

  return async (ctx: IContext): Promise<void> => {
    const user = ctx.getBindedValue<IUser>(EBindValue.User)

    if (!Validator.isDefined(user)) {
      ctx.sendError({
        code: Error.codes.ERR_USER_NOT_AUTHENTICATED,
        message: Error.messages.ERR_USER_NOT_AUTHENTICATED
      })

      return
    }

    const notFinishedJob = await services.packageDistributions.getCurrentlyWorking(user.id)

    // Ha van MÉG nem befejezett, akkor értelmeszerűen azzal kell foglalkozni.
    if (notFinishedJob) {
      const packageToDealWith = await Communicator.getPackageById(notFinishedJob.packageId)

      if (Validator.isNull(packageToDealWith)) {
        noMoreJobsHandler(ctx)

        return
      }

      const data: IGetNextJobResponse = {
        nextJob: {
          action: notFinishedJob.action,
          package: packageToDealWith,
          jobId: notFinishedJob.id
        }
      }

      ctx.sendJson(data)

      return
    }

    const currentDate = getDate(Date.now())

    // Különben pedig elkérjük az összes olyan csomagot, amivel foglalkozni kell,
    // illetve, hogy mi volt az utolsó ténylegesen elvégzett feladata a futárnak.
    const [ packages, previousJob ] = await Promise.all([
      Communicator.getActionablePackages(),
      services.packageDistributions.getPreviousJobByDay(user.id, currentDate)
    ])

    if (Validator.isNull(packages)) {
      noMoreJobsHandler(ctx)

      return
    }

    const { packagesForDelivery, packagesForPickUp } = packages

    // Ha egyikből sincs, akkor ennyi volt.
    if (
      !Validator.isNonEmptyArray(packagesForDelivery) &&
      !Validator.isNonEmptyArray(packagesForPickUp)
    ) {
      noMoreJobsHandler(ctx)

      return
    }

    // Ha nem volt előző feladat, akkor biztosan
    // ez lesz az első az adott napon, így random választunk neki egyet.
    if (Validator.isNull(previousJob)) {
      const job = findSuitableJob(
        HEADQUARTERS_GEO_DETAILS,
        packagesForDelivery,
        packagesForPickUp
      )

      if (Validator.isNull(job)) {
        noMoreJobsHandler(ctx)

        return
      }

      // Maguknál beszúrjuk a tényt.
      const jobId = await services.packageDistributions.insert({
        action: job.action,
        courierId: user.id,
        packageId: job.package.id
      })

      // És át is kell szólni a packageService-nek, hogy
      // ezzel a csomaggal, most egy ideig nem kell foglalkoznia.
      await Communicator.insertPackageLifeCycle({
        action: job.action,
        packageId: job.package.id,
        userId: user.id
      })

      const data: IGetNextJobResponse = {
        nextJob: {
          action: job.action,
          package: job.package,
          jobId
        }
      }

      ctx.sendJson(data)

      return
    }

    // Különben pedig meg kell keresnünk, hogy az előzőleg
    // elvégzett feladat címéhez melyik következő cím van
    // a legközelebb.
    const lastPackage = await Communicator.getPackageById(previousJob.packageId)

    if (Validator.isNull(lastPackage)) {
      noMoreJobsHandler(ctx)

      return
    }

    // Most pedig meg kell keresnünk, hogy melyik legyen a következő
    // feladat a jelenlegi pozíció szerint.
    const { destAddress } = lastPackage

    if (Validator.isNull(destAddress)) {
      noMoreJobsHandler(ctx)

      return
    }

    const suitableJob = findSuitableJob(
      destAddress,
      packagesForDelivery,
      packagesForPickUp
    )

    if (Validator.isNull(suitableJob)) {
      noMoreJobsHandler(ctx)

      return
    }

    const jobId = await services.packageDistributions.insert({
      action: suitableJob.action,
      courierId: user.id,
      packageId: suitableJob.package.id
    })

    await Communicator.insertPackageLifeCycle({
      action: suitableJob.action,
      packageId: suitableJob.package.id,
      userId: user.id
    })

    const data: IGetNextJobResponse = {
      nextJob: {
        action: suitableJob.action,
        package: suitableJob.package,
        jobId
      }
    }

    ctx.sendJson(data)
  }
}
