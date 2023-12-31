/* eslint-disable no-console */
import Validator from '@common/Validator/Validator'

import Cookie from '@common/Cookie/Cookie'

import { LOGIN_HASH_COOKIE_NAME } from './definitions'

import { onLogin } from './store'

import ajax from './ajax'

/** Inicializálja a session-t a sütik alapján. */
export default async function initSession (): Promise<boolean> {
  const loginHashCookie = Cookie.get(document.cookie, LOGIN_HASH_COOKIE_NAME)

  if (!Validator.isNonEmptyString(loginHashCookie)) {
    return false
  }

  const session = await ajax.getDigestSession(loginHashCookie)

  if (Validator.isNull(session)) {
    return false
  }

  const { user } = session

  if (Validator.isNull(user)) {
    return false
  }

  if (user.role !== 'admin') {
    return false
  }

  onLogin.set(user)

  return true
}
