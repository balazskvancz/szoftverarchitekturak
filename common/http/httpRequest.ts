import http from 'http'
import https from 'https'

import type { RequestOptions } from 'https'

import Validator from '@common/Validator/Validator'

const HTTPS_PORT = 443

interface IHttpResponse {
  readonly statusCode: number
  readonly data: TAnyObject
}

/**
 * Egy adott URL meghívása és a válasz visszaadása.
 * @param {string | https.RequestOptions | URL} options - Az url, amit hívunk, vagy beállítás.
 * @param {unknown} [data] - Opcionális adat, amit küldeni szeretnénk.
 * @returns {Promise<string>} A visszakapott szöveg.
 */
export default function httpRequest (
  options: string | RequestOptions | URL,
  data?: unknown
): Promise<IHttpResponse> {
  return new Promise((resolve, reject) => {
    /**
     * A module http vagy https, attól függően, hogy milyen porton akarunk kommunikálni.
     * Ez azért hasznos, mert ha localhoston belül akarunk kommunikálni másik service-el,
     * vagy fejlesztünk, akkor ne kelljen egy teljes kört mennie a neten, hanem helyben menjen a request.
     */
    const module = Validator.isObjectHaveKeys(options, [ 'port' ])
      ? (
        options.port === HTTPS_PORT
          ? https
          : http
      )
      : https

    /** Az adott module-on hívjuk a request metódust. */
    const req = module.request(options, async (response) => {
      // eslint-disable-next-line promise/param-names
      const readResponse: TAnyObject = await new Promise((innerRes) => {
        let body = ''

        response.on('data', (
          chunk: string
        ) => {
          body = body + chunk
        })

        response.on('end', () => {
          try {
            const json = JSON.parse(body)
            innerRes(json)
          }
          catch (error) {
            innerRes({})
          }
        })
      })

      resolve({
        data: readResponse,
        statusCode: response.statusCode ?? -1
      })
    })
      .on('error', (err) => {
        reject(err)
      })

    // Ha van adat, amit küldeni szeretnénk, akkor write.
    if (data) {
      const json = Validator.isNonEmptyString(data)
        ? data
        : JSON.stringify(data)

      req.write(json)
    }

    // Indul a request.
    req.end()
  })
}
