import { getFullDate } from '../utils/dateAndTime'
import type { TLogType } from './definitions'

export default class Logger {
  private readonly namespace: string

  public constructor (namespace: string) {
    this.namespace = namespace
  }

  /**
   * Hiba jellegű log.
   * @param l - Szöveg.
   */
  public error (l: string): void {
    this.log('error', l)
  }

  /**
   * Info jellegű log.
   * @param l - Szöveg.
   */
  public info (l: string): void {
    this.log('info', l)
  }

  /**
   * Figyelmeztető jellegű log.
   * @param l - A szöveg.
   */
  public warning (l: string): void {
    this.log('warning', l)
  }

  /**
   * Tényleges logolás megvalósító fv.
   * @param logType - A log típusa.
   * @param  l - A kiírandó szöveg.
   */
  private log (logType: TLogType, l: string): void {
    const namespace = this.namespace.length > 0
      ? `[${ this.namespace }] `
      : ''

    const logText = `${ namespace }${ getFullDate() } [${ logType }] ${ l }`

    // eslint-disable-next-line no-console
    console.log(logText)
  }
}
