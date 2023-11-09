/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios'

import type { IAjaxResponse } from '../definitions'

import parseError from './utils/parseError'

type TMethod = 'get' | 'post' | 'delete' | 'put'
type THeader = Record<string, string>

const axiosAPI = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true
})

// implement a method to execute all the request from here.
async function apiRequest<T extends TAnyObject = TAnyObject> (
  method: TMethod,
  url: string,
  data: TAnyObject | undefined,
  extraHeaders: THeader = {}
): Promise<IAjaxResponse<T>> {
  const headers = {
    authorization: '',
    'Access-Control-Allow-Origin': '*',
    ...extraHeaders
  }

  try {
    const res = await axiosAPI({
      method,
      url,
      data,
      headers
    })

    return {
      data: res.data,
      error: null
    }
  }
  catch (err) {
    return {
      data: {} as T,
      error: parseError(err)
    }
  }
}

/**
 * Get típusú kérés a megadott URL-re.
 * @param url - Cél url.
 * @param extraHeaders - Egyéb – explicit – fejlécek.
 */
function get <T extends TAnyObject = TAnyObject> (
  url: string,
  extraHeaders?: THeader
): Promise<IAjaxResponse<T>> {
  return apiRequest('get', url, undefined, extraHeaders)
}

/**
 * Delete típusú kérés a megadott URL-re.
 * @param url - Cél url.
 * @param extraHeaders - Egyéb – explicit – fejlécek.
 */
function deleteRequest <T extends TAnyObject = TAnyObject> (
  url: string,
  extraHeaders?: THeader
): Promise<IAjaxResponse<T>> {
  return apiRequest('delete', url, undefined, extraHeaders)
}

/**
 * Post típusú kérés a megadott URL-re.
 * @param url   - Cél url.
 * @param data  - A küldendő adat.
 * @param extraHeaders - Egyéb – explicit – fejlécek.
 */
function post <T extends TAnyObject = TAnyObject> (
  url: string,
  data: TAnyObject,
  extraHeaders?: THeader
): Promise<IAjaxResponse<T>> {
  const headers = {
    'Content-Type': 'application/json',
    ...extraHeaders
  }

  return apiRequest('post', url, data, headers)
}

/**
 * Put típusú kérés a megadott URL-re.
 * @param url   - Cél url.
 * @param data  - A küldendő adat.
 * @param extraHeaders - Egyéb – explicit – fejlécek.
 */
function put <T extends TAnyObject = TAnyObject> (
  url: string,
  data: TAnyObject,
  extraHeaders?: THeader
): Promise<IAjaxResponse<T>> {
  const headers = {
    'Content-Type': 'application/json',
    ...extraHeaders
  }

  return apiRequest('put', url, data, headers)
}

// expose your method to other services or actions
const api = {
  get,
  delete: deleteRequest,
  post,
  put
}

export default api
