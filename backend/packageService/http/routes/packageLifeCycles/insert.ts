import type {
  IContext,
  TCallbackFunction
} from '@common/Router/definitions'

import Error      from '@packageService/Error'
import Validator  from '@packageService/Validator'

import type { IService } from '@backend/packageService/getServices'

import { VALID_NEXT_ACTIONS } from '@packageService/definitions'

import type { IInsertPackageLifeCycleRequest } from '@packageService/definitions'

/**
 * Egy új csomag életciklus esemény beszúrása.
 * @param services - Services.
 */
export default function insert (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const postData = ctx.getBody<IInsertPackageLifeCycleRequest>()

    if (!Validator.isDefined(postData)) {
      ctx.sendError({
        code: Error.codes.ERR_WRONG_POSTDATA,
        message: Error.messages.ERR_WRONG_POSTDATA
      })

      return
    }

    const { action, packageId } = postData

    if (!Validator.isPositiveNumber(packageId)) {
      ctx.sendError({
        code: Error.codes.ERR_WRONG_POSTDATA,
        message: 'Helytelen csomag azonosító!'
      })

      return
    }

    // Amennyiben nem valid a megadott action, akkor is hiba.
    if (!Validator.isValidPackageLifeCycleAction(action)) {
      return
    }

    // Elkérjük az utolsó a jelen csomaghoz tartozó
    // életciklust. Ha nincs ilyen, akkor az azt is jelenti,
    // hogy ilyen csomag sincs.
    //
    // Jogosan merülhet fel a kérdés, hogy új csomag bszúrása
    // után külön meghívódik-e ez a végpont, de a válasz: nem!
    // A csomag létrehozása felelős ezért, hogy az első életciklust
    // is megfelelően felvegye.
    const latest = await services.packageLifecycles.getLatest(packageId)

    if (Validator.isNull(latest)) {
      ctx.sendError({
        code: Error.codes.ERR_PACKAGE_NOT_EXISTS,
        message: Error.messages.ERR_PACKAGE_NOT_EXISTS
      })

      return
    }

    const possibleNextAction = VALID_NEXT_ACTIONS[latest.action]

    // Amennyiben itt false-t kapunk, akkor az csak annyit
    // jelent, hogy egy „illegális” műveletet szerettünk volna
    // végrehajtani, tehát mondjuk „shipped”-re hívunk egy „created”-et.
    if (!Validator.isOneOf(action, ...possibleNextAction)) {
      ctx.sendError({
        code: Error.codes.ERR_NEXT_PACKAGE_ACTION_INVALID,
        message: Error.messages.ERR_NEXT_PACKAGE_ACTION_INVALID
      })

      return
    }

    const insertedId = await services.packageLifecycles.insert({
      action,
      packageId,
      userId: -1 // TODO: fix.
    })

    if (!Validator.isPositiveNumber(insertedId)) {
      ctx.sendError({
        code: Error.codes.ERR_DB_INSERT,
        message: Error.messages.ERR_DB_INSERT
      })

      return
    }

    // Legvégül pedig eljutunk oda, hogy minden sikeres volt!
    ctx.sendOk()
  }
}
