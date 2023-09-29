import middleware from '../middleware'

describe('middleware', () => {
  test('A függvény kiolvassa, leparseolja, bindolja a postData-t, majd mehívja a next()-et.', async () => {
    const onDataFn = jest.fn()
    const onEndFn  = jest.fn()

    const data = '{"foo":"bar"}'

    const incomingMessage: any = {
      on: (event: string, callback: any) => {
        if (event === 'data') {
          onDataFn()
          callback(data)
        }
        else {
          onEndFn()
          callback()
        }
      },
      setEncoding: jest.fn()
    }

    const ctx = {
      getNativeRequest: jest.fn(),
      setBody: jest.fn()
    }

    ctx.getNativeRequest.mockReturnValueOnce(incomingMessage)

    const nextFn = jest.fn()

    await middleware(ctx as any, nextFn)

    expect(onDataFn).toHaveBeenCalledOnce()
    expect(onEndFn).toHaveBeenCalledOnce()
    expect(ctx.getNativeRequest).toHaveBeenCalledOnce()
    expect(nextFn).toHaveBeenCalledOnce()

    expect(ctx.setBody.mock.calls[0][0]).toStrictEqual({
      foo: 'bar'
    })
  })
})
