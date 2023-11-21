import type {
  IContext,
  TCallbackFunction
} from '@common/Router/definitions'

import Validator from '@common/Validator/Validator'

import Communicator from '@backend/Communicator/Communicator'

import type { IService } from '@backend/distributorService/getServices'

import Error from '@backend/distributorService/Error'

/**
 * Feleadatok ütemezése végpont.
 * @param services - Services.
 */
export default function schedule (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    // Először meg kell határozni, hogy kik azok
    // akik az adott napon dolgoznak is.
    // Ha nincs egy futár sem, akkor nem is tudunk semmit tenni.
    const workingCouriers = await Communicator.getWorkingCouriers()

    if (!Validator.isNonEmptyArray(workingCouriers)) {
      ctx.sendError({
        code: Error.codes.ERR_NO_CURRENTLY_WORKING_COURIER,
        message: Error.messages.ERR_NO_CURRENTLY_WORKING_COURIER
      })

      return
    }

    // Következő lépésként azt meg kell elkérni
    // a packeService-től, hogy milyen csomagokkal
    // kell a mai napon foglalkoznunk.
    const actionablePackages = await Communicator.getActionablePackages()

    if (Validator.isNull(actionablePackages)) {
      ctx.sendError({
        code: Error.codes.ERR_GET_PACKAGES_RESPONSE,
        message: Error.messages.ERR_GET_PACKAGES_RESPONSE
      })

      return
    }

    const { packagesForDelivery, packagesForPickUp } = actionablePackages

    // Ha egyikből sincs, akkor ennyi volt.
    if (
      !Validator.isNonEmptyArray(packagesForDelivery) &&
      !Validator.isNonEmptyArray(packagesForPickUp)
    ) {
      ctx.sendError({
        code: Error.codes.ERR_NO_PACKAGE_TO_DEAL_WITH,
        message: Error.messages.ERR_NO_PACKAGE_TO_DEAL_WITH
      })

      return
    }

    // TODO

    ctx.sendOk()
  }
}
