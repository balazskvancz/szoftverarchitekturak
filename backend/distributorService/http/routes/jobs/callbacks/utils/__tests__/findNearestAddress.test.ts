import type { IAddressGeoDetails } from '@distributorService/definitions'

import findNearestAddress from '../findNearestAddress'

interface ITestCase {
  readonly name: string
  readonly startAddress: IAddressGeoDetails
  readonly addressDetails: readonly IAddressGeoDetails[]
  readonly expected: TAnyObject | null
}

type TTestingTable = readonly ITestCase[]

describe('findNearestAddress', () => {
  beforeEach(jest.resetAllMocks)

  const tt: TTestingTable = [
    {
      name: 'A függvény `null`-t ha üres a megadott tömb.',
      startAddress: {
        latitude: 1,
        longitude: 2
      },
      addressDetails: [],
      expected: null
    },
    {
      name: 'A függvény helyes adatot ad vissza, ha csak egy elemű a tömb.',
      startAddress: {
        longitude: 19.0592938,
        latitude: 47.4734644
      },
      addressDetails: [
        {
          longitude: 19.04591770274837,
          latitude: 47.507049550000005
        }
      ],
      expected: {
        distance: 0.03615082679840207,
        index: 0
      }
    },
    {
      name: 'A függvény helyes adatot ad vissza, ha nem egy elemű a tömb (kettő cím).',
      startAddress: {
        longitude: 19.0592938,
        latitude: 47.4734644
      },
      addressDetails: [
        {
          longitude: 19.04591770274837,
          latitude: 47.507049550000005
        },
        {
          longitude: 19.049118503545635,
          latitude: 47.47508395
        }
      ],
      expected: {
        distance: 0.0103033780934549,
        index: 1
      }
    },
    {
      name: 'A függvény helyes adatot ad vissza, ha nem egy elemű a tömb (három cím).',
      startAddress: {
        longitude: 19.0592938,
        latitude: 47.4734644
      },
      addressDetails: [
        {
          longitude: 19.04591770274837,
          latitude: 47.507049550000005
        },
        {
          longitude: 19.049118503545635,
          latitude: 47.47508395
        },
        {
          longitude: 19.023150085813544,
          latitude: 47.4907168
        }
      ],
      expected: {
        distance: 0.0103033780934549,
        index: 1
      }
    }
  ]

  test.each(tt)('$name', ({ addressDetails, expected, startAddress }) => {
    const got = findNearestAddress(startAddress, addressDetails)

    expect(got).toStrictEqual(expected)
  })
})
