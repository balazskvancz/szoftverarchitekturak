import type {
  IContext,
  TCallbackFunction
} from '@common/Router/definitions'

import Validator from '@backend/packageService/Validator'

import type { IService } from '@backend/packageService/getServices'
import type { TDigestPackages, IGetActionablePackagesResponse } from '@backend/packageService/definitions'

/**
 * Visszaadja az összes olyan csomagot, amellyel lehet valamit kezdeni.
 * @param services - Services.
 */
export default function getActionable (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const [ created, movedToCenter ] = await Promise.all([
      services.packageLifecycles.getByLatestAction('created'),
      services.packageLifecycles.getByLatestAction('movedToCenter')
    ])

    // Szükségünk van a csomagok azonosítójára.
    const toBePickedUpIds  = created.map(({ packageId }) => packageId)
    const toBeDeliveredIds = movedToCenter.map(({ packageId }) => packageId)

    const [ toBePickedUp, toBeDelivered ] = await Promise.all([
      Validator.isNonEmptyArray(toBePickedUpIds)
        ? services.packages.getByIds(toBePickedUpIds)
        : [],

      Validator.isNonEmptyArray(toBeDeliveredIds)
        ? services.packages.getByIds(toBeDeliveredIds)
        : []
    ])

    const addressIds = [
      ...toBePickedUp.map(({ destAddressId }) => destAddressId),
      ...toBeDelivered.map(({ destAddressId }) => destAddressId)
    ]

    if (Validator.isNonEmptyArray(addressIds)) {
      const data: IGetActionablePackagesResponse = {
        packagesForDelivery: [],
        packagesForPickUp: []
      }

      ctx.sendJson(data)

      return
    }

    const addresses = await services.addresses.getByIds(addressIds)

    const packagesForPickUp: TDigestPackages = toBePickedUp.map((p) => {
      const destAddress = addresses.find((e) => e.id === p.destAddressId)

      return {
        ...p,

        destAddress: destAddress ?? null,

        lifeCycles: [] // Nincs rá szükség.
      }
    })

    const packagesForDelivery: TDigestPackages = toBeDelivered.map((p) => {
      const destAddress = addresses.find((e) => e.id === p.destAddressId)

      return {
        ...p,

        destAddress: destAddress ?? null,

        lifeCycles: [] // Nincs rá szükség.
      }
    })

    const data: IGetActionablePackagesResponse = {
      packagesForDelivery,
      packagesForPickUp
    }

    ctx.sendJson(data)
  }
}
