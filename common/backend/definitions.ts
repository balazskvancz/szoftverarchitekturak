export interface IRowsCount {
  readonly count: number
}

type TErrorFormat = `ERR_${ string }`

export type TErrorCodes <T extends TErrorFormat> = {
  readonly [key in T]: number
}

export type TErrorMessages <T extends TErrorFormat> = {
  readonly [key in T]: string
}

export interface IError <T extends TErrorFormat> {
  readonly codes: TErrorCodes<T>
  readonly messages: TErrorMessages<T>
}
