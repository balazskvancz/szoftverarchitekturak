import type {
  IContext,
  TCallbackFunction
} from '@common/Router/definitions'

import type {
  IUser,
  IDigestPackage,
  IGetDigestPackages
} from '@packageService/definitions'

import { EBindValue } from '@packageService/definitions'

import Error      from '@packageService/Error'
import Validator  from '@packageService/Validator'

import type { IService } from '@backend/packageService/getServices'

/**
 * Azonosító szerinti lekérdezés.
 * @param services - Services.
 */
export default function get (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const user = ctx.getBindedValue<IUser>(EBindValue.User)

    if (!Validator.isDefined(user)) {
      ctx.sendError({
        code: Error.codes.ERR_USER_NOT_AUTHENTICATED,
        message: Error.messages.ERR_USER_NOT_AUTHENTICATED
      })

      return
    }

    if (user.role !== 'customer') {
      ctx.sendError({
        code: Error.codes.ERR_NOT_CUSTOMER,
        message: Error.messages.ERR_NOT_CUSTOMER
      })

      return
    }

    const packages = await services.packages.getBySenderId(user.id)

    if (!Validator.isNonEmptyArray(packages)) {
      const data: IGetDigestPackages = {
        digestPackages: []
      }

      ctx.sendJson(data)

      return
    }

    const { addressIds, packageIds } = packages.reduce((acc, curr) => {
      acc.addressIds.push(curr.destAddressId)
      acc.addressIds.push(curr.pickUpAddressId)
      acc.packageIds.push(curr.id)

      return acc
    }, { packageIds: [], addressIds: [] } as { packageIds: number[], addressIds: number[] })

    const [ lifeCycles, addresses ] = await Promise.all([
      services.packageLifecycles.getByPackageIds(packageIds),
      services.addresses.getByIds(addressIds)
    ])

    const digestPackages: IDigestPackage[] = packages.reduce((acc, curr) => {
      const attachedLifeCycles = lifeCycles.filter((e) => e.packageId === curr.id)

      const destAddress   = addresses.find((e) => e.id === curr.destAddressId)
      const pickUpAddress = addresses.find((e) => e.id === curr.pickUpAddressId)

      if (destAddress && pickUpAddress) {
        acc.push({
          ...curr,

          lifeCycles: attachedLifeCycles,
          destAddress: destAddress ?? null,
          pickUpAddress: pickUpAddress ?? null
        })
      }

      return acc
    }, [] as IDigestPackage[])

    const data: IGetDigestPackages = {
      digestPackages
    }

    ctx.sendJson(data)

    ctx.sendJson(data)
  }
}
