/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */

import http from 'http'

import type { ICrossResponse } from './definitions'

type TData = Object | string | null

const HTTP_STATUS_OK          = 200
const HTTP_STATUS_BAD_REQUEST = 400

export default class CrossRequest extends Request {
  /**
   * Egy szerverek közötti http kérés.
   * @see {@link https://nodejs.org/api/http.html#httprequestoptions-callback}
   * @param options             - A beállítási lehetőségek.
   * @param data                - Bármilyen adat, amit küldeni szeretnénk.
   * @param needToParseResponse - Kell-e parseolni a választ.
   */
  public static send<T extends Object = TAnyObject> (
    options: http.RequestOptions,
    data: TData = null,
    needToParseResponse = true
  ): Promise<ICrossResponse<T>> {
    return new Promise((resolve) => {
      const crossRequest = http.request(options, (res) => {
        let body = ''

        res.setEncoding('utf8')

        res.on(
          'data',
          (chunk: string) => {
            body = body + chunk
          }
        )

        res.on('end', () => {
          if (
            res.statusCode === HTTP_STATUS_OK ||
            res.statusCode === HTTP_STATUS_BAD_REQUEST
          ) {
            if (needToParseResponse) {
              resolve({
                data: JSON.parse(body),
                isSuccess: res.statusCode === HTTP_STATUS_OK
              })

              return
            }

            resolve({
              data: null,
              isSuccess: true
            })
          }

          resolve({
            data: null,
            isSuccess: false
          })
        })
      })

      crossRequest.on('error', (error) => {
        console.log('[CROSSREQUEST][error]', error)

        resolve({ isSuccess: false, data: {} })
      })

      if (
        (options?.method === 'POST' || options?.method === 'PUT') &&
        (typeof data === 'string' || typeof data === 'object')
      ) {
        const sendData = typeof data === 'object'
          ? JSON.stringify(data)
          : data

        crossRequest.write(sendData)
      }

      crossRequest.end()
    })
  }
}
