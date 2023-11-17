import type { IFormError } from '@common/definitions'

import Validator from '@common/Validator/Validator'

import type { IInsertPackageRequest } from '@packageService/definitions'

import validateAddress from '../../addresses/utils/validatePostData'

/**
 * Validálja a bejövő adatot.
 * @param d - A vizsgálandó adat.
 */
export default function validatePostData (d: IInsertPackageRequest): IFormError[] {
  const errors: IFormError[] = []

  // if (!Validator.isPositiveNumber(d.senderId)) {
    // errors.push({
      // key: 'senderId',
      // message: 'Kötelező küldő azonosítót megadni!'
    // })
  // }

  if (!Validator.isPositiveNumber(d.pickUpAddressId)) {
    errors.push({
      key: 'pickUpAddressId',
      message: 'Kötelező felvételi címet megadni!'
    })
  }

  if (!Validator.isNonEmptyString(d.receiverEmail)) {
    errors.push({
      key: 'receiverEmail',
      message: 'Kötelező címzett azonosítót megadni!'
    })
  }

  if (!Validator.isNonEmptyString(d.receiverName)) {
    errors.push({
      key: 'receiverName',
      message: 'Kötelező címzett nevet megadni!'
    })
  }

  // if (!Validator.isPositiveNumber(d.destAddressId)) {
    // errors.push({
      // key: 'destAddressId',
      // message: 'Kötelező kézbesítési címet megadni!'
    // })
  // }

  if (!Validator.isPositiveNumber(d.dimensionId)) {
    errors.push({
      key: 'dimensionId',
      message: 'Kötelező méretet címet megadni!'
    })
  }

  if (!Validator.isPositiveNumber(d.weight)) {
    errors.push({
      key: 'weight',
      message: 'Kötelező súlyt címet megadni!'
    })
  }

 //  if (
    // !Validator.isNull(d.expectedDelivery) &&
    // !Validator.isNonEmptyString(d.expectedDelivery) // TODO: isValidDate
  // ) {
    // errors.push({
      // key: 'expectedDelivery',
      // message: 'Helytelen dátum formátum!'
    // })
  // }

  // if (
    // !Validator.isNull(d.suitableReceipt) &&
    // !Validator.isNonEmptyString(d.suitableReceipt) // TODO: isValidDate
  // ) {
    // errors.push({
      // key: 'suitableReceipt',
      // message: 'Helytelen dátum formátum!'
    // })
  // }

  // Az itteni hibák + a címek validálása.
  return [ ...errors, ...validateAddress(d.dest) ]
}
