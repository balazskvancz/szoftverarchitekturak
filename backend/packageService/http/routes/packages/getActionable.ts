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
      ...toBePickedUp.map(({ pickUpAddressId }) => pickUpAddressId),
      ...toBePickedUp.map(({ destAddressId }) => destAddressId),

      ...toBeDelivered.map(({ destAddressId }) => destAddressId),
      ...toBeDelivered.map(({ pickUpAddressId }) => pickUpAddressId)
    ]

    if (!Validator.isNonEmptyArray(addressIds)) {
      const data: IGetActionablePackagesResponse = {
        packagesForDelivery: [],
        packagesForPickUp: []
      }

      ctx.sendJson(data)

      return
    }

    const addresses = await services.addresses.getByIds(addressIds)

    const packagesForPickUp: TDigestPackages = toBePickedUp.reduce((acc, curr) => {
      const destAddress   = addresses.find((e) => e.id === curr.destAddressId)
      const pickUpAddress = addresses.find((e) => e.id === curr.pickUpAddressId)

      if (destAddress && pickUpAddress) {
        acc.push({
          ...curr,

          destAddress,
          pickUpAddress,

          lifeCycles: [] // Nincs rá szükség.
        })
      }

      return acc
    }, [] as TMutable<TDigestPackages>)

    const packagesForDelivery: TDigestPackages = toBeDelivered.reduce((acc, curr) => {
      const destAddress   = addresses.find((e) => e.id === curr.destAddressId)
      const pickUpAddress = addresses.find((e) => e.id === curr.pickUpAddressId)

      if (destAddress && pickUpAddress) {
        acc.push({
          ...curr,

          destAddress,
          pickUpAddress,

          lifeCycles: [] // Nincs rá szükség.
        })
      }

      return acc
    }, [] as TMutable<TDigestPackages>)

    const data: IGetActionablePackagesResponse = {
      packagesForDelivery,
      packagesForPickUp
    }

    ctx.sendJson(data)
  }
}
