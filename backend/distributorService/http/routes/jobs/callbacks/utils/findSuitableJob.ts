import Validator from '@common/Validator/Validator'

import type {
  IDigestPackage,
  TDigestPackages,
  IAddressGeoDetails,
  TPackageLifeCycleAction
} from '@distributorService/definitions'

import findNearestAddress from './findNearestAddress'

interface IFoundJob {
  readonly package: IDigestPackage
  readonly action: TPackageLifeCycleAction
}

/**
 * Visszaadja a következő feleadatot, a jelenlegi pozíció
 * és a a lehetséges csomagok közül.
 * @param currentPosition   - Jelenlegi pozicíó.
 * @param deliveryPackages  - Kiszállítandó csomagok.
 * @param pickupPackages    - Ügyféltől való felvevendő csomagok.
 */
export default function findSuitableJob (
  currentPosition: IAddressGeoDetails,
  deliveryPackages: TDigestPackages,
  pickupPackages: TDigestPackages
): IFoundJob | null {
  const deliveryAddresses = deliveryPackages.map((e) => e.destAddress)
  const pickupAddresses   = pickupPackages.map((e) => e.destAddress)

  const nearestDelivery = findNearestAddress(currentPosition, deliveryAddresses)
  const nearestPickup   = findNearestAddress(currentPosition, pickupAddresses)

  // Szinte esélytelen, de nem szabad semmire hagyatkozni.
  if (
    Validator.isNull(nearestDelivery) &&
    Validator.isNull(nearestPickup)
  ) {
    return null
  }

  // Ekkor biztosan pickup-os melóval kell folytatni.
  if (Validator.isNull(nearestDelivery) && !Validator.isNull(nearestPickup)) {
    return {
      action: 'pickedUp',
      package: pickupPackages[nearestPickup?.index]
    }
  }

  // Ekkor pedig szállítási meló.
  if (Validator.isNull(nearestPickup) && !Validator.isNull(nearestDelivery)) {
    return {
      action: 'onDelivery',
      package: deliveryPackages[nearestDelivery.index]
    }
  }

  if (
    !Validator.isNull(nearestDelivery) &&
    !Validator.isNull(nearestPickup)
  ) {
    // Különben pedig a kettő közül a kisebbik lesz a „nyertes”.
    const isJobDelivery = nearestDelivery.distance < nearestPickup.distance

    if (isJobDelivery) {
      return {
        action: 'onDelivery',
        package: deliveryPackages[nearestDelivery.index]
      }
    }

    return {
      action: 'pickedUp',
      package: pickupPackages[nearestPickup.index]
    }
  }

  return null
}
