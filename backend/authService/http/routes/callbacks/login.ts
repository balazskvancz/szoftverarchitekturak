import type { IContext, TCallbackFunction } from '@common/Router/definitions'

import Validator from '@common/Validator/Validator'

import Error from '@authService/Error'

import type { ILogin } from '@authService/definitions'
import type { IService } from '@authService/getServices'

/**
 * A felhasználó bejelentkeztetese.
 * @param services - Services.
 */
export default function login (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const loginData = ctx.getBody<ILogin>()
    console.log(loginData)

    // note: ebbe soha nem megy bele, akkor sem ha postmanbol body none-nal kuldom, mindig van egy ures body: {}
    // [Balázs]: ezt jól észrevetted, pontosan így van, ahogy mondod. A „keretrendszer” megpróbál minden
    // olyan dolgot megfogni, ami miatt egy ilyen jellegű alkalmazás hibás lehet – pl. security risk.
    //
    // Egyedül a TypeScript miatt van szükség erre a checkolásra, mert típus szinten
    // nem tudtam garantáltatni, hogy ténylegesen, minden egyes állapotban – tehát determinisztikusan –
    // ott lesz az adat. Pedig ott van... ez a szépsége TS/JS környezetnek :).
    if (!Validator.isDefined(loginData)) {
      ctx.sendError({
        code: Error.codes.ERR_MISSING_BODY,
        message: Error.messages.ERR_MISSING_BODY
      })

      return
    }

    if (!Validator.isNonEmptyString(loginData.email)) {
      ctx.sendError({
        code: Error.codes.ERR_WRONG_POSTDATA,
        message: 'Hiányzó email'
      })

      return
    }

    if (!Validator.isNonEmptyString(loginData.passHash)) {
      ctx.sendError({
        code: Error.codes.ERR_WRONG_POSTDATA,
        message: 'Hiányzó jelszó'
      })

      return
    }

      /**
       * // TODO email+hash => userValidáció
       *  megkérdezni a userAuth-tól hogy helyesek-e a bejelentkezési adatok
       *  köztes kommunikátor service?
       *
       *  Megkapjuk a userId-t
       *  további feladatok:
       *  1) Loginhash létrehozása
       *  2) login rekord beszúrása az adatbázisba.
       */

    // case: user letezik visszakaptuk az Id-jat
    const userId = 0

    // [Balázs]: Woooow! Szép lett, nekem tetszik! :)
    // TODO: kérlek ez a logikát szervezd ki egy függvénybe.
    // Ennek a helye lehet akár itt a saját szervízen belül is,
    // de teheted a @common/utils alá is.
    const loginHash = `${ userId }-${ Date.now() }-${ [ ...Array(32) ].map(() => Math.random().toString(36)[2]).join('') }`

    const insertSuccess = await services.sessions.insert(loginHash, userId)

    if (!insertSuccess) {
      ctx.sendError({
        code: Error.codes.ERR_DB_INSERT,
        message: Error.messages.ERR_DB_INSERT
      })

      return
    }

    ctx.sendJson({
      loginHash
    })
  }
}
