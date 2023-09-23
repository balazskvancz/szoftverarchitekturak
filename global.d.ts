declare global {
  const __CORDOVA__: boolean
  const __TEST__: boolean
  const __PROD__: boolean
  const __DEV__: boolean

  type TUnknownObject = Record<string, unknown>

  type TConstructor <T> = new (...args: never[]) => T

  type TArrayItem <T extends readonly any[]> = T extends readonly (infer U)[] ? U : never

  type TAnyObject = Record<string, any>

  type TJsonObject = Record<
    string,
    string | number | boolean | null | TAnyObject | TAnyObject[]
  >

  type TBaseCallback<TArgs = unknown, TReturn = unknown> = (...args: TArgs[]) => TReturn
  type TUnknownCallback = TBaseCallback
  type TVoidCallback = () => void
  type TEventCallback = (e: Event) => void
  type TPromiseCallback = () => Promise<void>

  type TNonEmptyArray<T> = [ T, ...T[] ]

  type TKeys<T extends Object> = (keyof T)[]
  type TValueOf<T> = T[keyof T]
  type TValues<T> = TValueOf<T>[]

  type TMutable <T> = { -readonly [P in keyof T]: T[P] }

  type TOptionalKeys<T extends Object> = NonNullable<{
    [K in keyof T]: Record<string, never> extends { [P in K]: T[P] } ? K : never
  }[keyof T]>

  type TKeyValuePairs<T extends string | number | symbol> = {
    [P in T]: P
  }

  type TReadonlyRecord<A extends string | number | symbol, B> = Readonly<Record<A, B>>

  type TFilter<K, T extends unknown[]> = {
    [P in keyof T]: Exclude<T[P], K>
  }[number]

  type TFilterKey<K, T extends unknown[]> = TFilter<K, T> extends never ? K[] : TFilter<K, T>[]

  type TReplacer = [ from: string, to: string ]

  type TReplaceKey <T extends TReplacer[], O extends Object, K extends keyof O> = TFilterKey<K, {
    [P in keyof T]: K extends T[P][0] ? T[P][1] : K
  }>[0]

  type TReplaceKeys<T extends TReplacer[], I extends Object> = {
    [F in keyof I as TReplaceKey<T, I, F>]: I[F]
  }

  type TReplaceTypes<F extends Object, T extends Object> = F extends { [key in keyof T]?: unknown } ? Omit<F, keyof T> & T : F
}

export {}
