import type { IConfig } from './definitions'

import config from './config.json'

/** Beolvassa a configot és visszaadja azt. */
export default function getConfig (): IConfig {
  return config
}
