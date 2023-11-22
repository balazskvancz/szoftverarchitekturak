import type { IAddressGeoDetails } from '@distributorService/definitions'

interface ISearcResult {
  // Hanyadik helyen volt a tömbben,
  index: number
  // Mekkora a távolság, ez mindig pozitív szám lesz.
  distance: number
}

const SECOND_POWER = 2

/**
 * Megtalálja a legközelebbi címet, a kezőcímhez képest.
 * @param currentPosition - Jelenleg cím alias kezdőcím.
 * @param addressDetails  - A lehetséges címek tömbje.
 */
export default function findNearestAddress (
  currentPosition: IAddressGeoDetails,
  addressDetails: readonly IAddressGeoDetails[]
): ISearcResult | null {
  const finalValue: ISearcResult | null = addressDetails.reduce((acc, curr, index) => {
    const xSquare = (curr.latitude - currentPosition.latitude) ** SECOND_POWER
    const ySquare = (curr.longitude - currentPosition.longitude) ** SECOND_POWER

    const distance = Math.sqrt(xSquare + ySquare)

    if (!acc) {
      return {
        distance,
        index
      }
    }

    // Ha az újonnan talált távolság kisebb, mint az eddigi, akkor winner.
    if (distance < acc.distance) {
      return {
        distance,
        index
      }
    }

    return acc
  }, null as ISearcResult | null)

  return finalValue
}
