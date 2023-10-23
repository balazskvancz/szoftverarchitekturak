/* eslint-disable no-restricted-syntax */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-console */

import http from 'http'

import type { ICrossResponse } from './definitions'

type TData = Object | string | null

const HTTP_STATUS_OK = 200

export default class CrossRequest extends Request {
  /**
   * Egy szerverek közötti http kérés.
   * @see {@link https://nodejs.org/api/http.html#httprequestoptions-callback}
   * @param options - A beállítási lehetőségek.
   * @param data    - Bármilyen adat, amit küldeni szeretnénk.
   */
  public static send<T extends Object = TAnyObject>(
    options: http.RequestOptions,
    data: TData = null
  ): Promise<ICrossResponse<T>> {
    return new Promise((resolve) => {
      const crossRequest = http.request(options, (res) => {
        let body = ''

        res.setEncoding('utf8')

        res.on(
          'data',
          (
            /** @type {string} */
            chunk
          ) => {
            body = body + chunk
          }
        )

        res.on('end', () => {
          resolve({
            data: JSON.parse(body),
            isSuccess: res.statusCode === HTTP_STATUS_OK
          })
        })
      })

      crossRequest.on('error', (error) => {
        console.log('[CROSSREQUEST][error]', error)

        resolve({ isSuccess: false, data: {} })
      })

      if (
        (options?.method === 'POST' || options?.method === 'PUT') &&
        (typeof data === 'string' || (typeof data === 'object' && !data))
      ) {
        const sendData = typeof data === 'object' ? JSON.stringify(data) : data

        crossRequest.write(sendData)
      }

      crossRequest.end()
    })
  }
}
