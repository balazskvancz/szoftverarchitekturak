import type devServer from 'webpack-dev-server'

type TType = 'web' | 'node'

export interface IParams {
  type: TType
  projectFolder: string
  dist: string
  cssMode?: 'modules' | 'tailwind'
  localIdentName?: string
  imageOutputPath?: string
  favicon?: string
}

export interface IEnv {
  /* eslint-disable @typescript-eslint/naming-convention */
  electron?: boolean
  cordova?: boolean
  /* eslint-enable @typescript-eslint/naming-convention */
}

export interface IArgv {
  mode: 'production' | 'development'
}

export type TDevTool = 'inline-source-map' | 'source-map'

export type TTarget = 'electron-renderer'

export type TProxy = devServer.ProxyConfigMap

// https://webpack.js.org/configuration/stats/#stats-presets
export type TStats = (
  'errors-only'     |
  'errors-warnings' |
  'minimal'         |
  'none'            |
  'normal'          |
  'verbose'         |
  'detailed'        |
  'summary'
)
