# Router

A REST architektúra igényeit kielégítő HTTP router.

## Inicializálás

Egy új Router egyed példányosítása az alábbiak szerint történik:

```typescript
import Router from '@common/Router/Router'

const router = Router.getInstance({
  address: 8000,
  hasLogger: true
})
```

A fenti példakóban egy olyan Router-t egyedet példányosítunk, amey a `8000`-es porton fogja fogadni a bejövő HTTP kéréseket, és engedélyezve van a logolás.

## Végpontok felvétele

A korábban használt Router-rel ellentétben, jelen esetben nem elég csak az URL-t és a hozzá tartozó `callback`-et megadni, hanem előre meg kell adnunk, hogy az milyen HTTP metódus esetén legyen érvényes. A lenti példán tisztán látható, hogy hibába vessük fel ugyanazt az URL-t négyszer is, mégsem lesz ebből ütközés, hiszen azok különböző metódusok alatt vannak regisztrálva.

```typescript
router.get('/api/products', getCallback)
router.post('/api/products', postCallback)
router.put('/api/products', putCallback)
router.delete('/api/products', deleteCallback)
```

A bejövő metódus szerinti megkülönbözetésnek hála, a regisztrálandó URL-ekben nics szükség a kívánt művelet definiálásra, ahogy azt a REST alapelvek is követelik.

```typescript
router.get('/api/products/get', getCallback)  // Ez rossz.
router.get('/api/products', getCallback)      // Ez helyes.

router.post('/api/products/insert', postCallback) // Ez rossz.
router.post('/api/products', postCallback)        // Ez helyes.
```

### RouteParamok

Továbbra is van lehetőség arra, hogy nem explicit egyezés legyen az egyes végpontok URL-jében, hanem úgynevezetett `wildcard` paraméterek jelöljenek egy „bármilyen értéket”.

```typescript
router.get('/api/products/:id', getCallback)
```

Tehát, az összes olyan URL illeszkedni fog a fenti példában definiált végpontra, amely `/api/products/`-al kezdődik és utána már csak egy „paraméter” jön. Ez a paraméter természetesen bármi lehet.


## Callback signature

A natív `callback signature` helyett – `(params: TAnyObject, req: http.IncomingMessage, res: http.ServerResponse): Promise<void>` - egy új, rövidebb függvény prototípus kapott helyet, ami az alábbi.

```typescript
import { IContext, TCallbackFunction } from '@common/Router/definitions'

// Ennek a függvénynek meg van a típusa is, amely a „TCallbackFunction”.
async function exampleCallback (ctx: IContext): Promise<void> {}
```

A paraméterként kapott kontextus egy wrapper a natív kérés-válasz kombóra, így minden egyes azokkal való interrakció ezen keresztül történik. Ennek köszönhetően, nincs szükség arra, hogy beimportáljuk a `Response` vagy a `Request` csomagokat, azok teljes funkcionalitását magába foglalja az IContext.

A IContext-hez tartozó összes funckió az alábbiakban látható.

```typescript
export interface IContext extends ILogger {
  getNativeRequest: () => http.IncomingMessage

  /** Bejövő kéréssel kapcsolatos művelete. */
  getUrl: () => string
  getBody: <T>() => T | undefined
  setBody: (b: TAnyObject) => void
  getQueryParams: <T = IQueryParams>() => T
  getRouteParams: () => IRouteParams
  setRouteParams: (params: IRouteParams) => void
  getCookie: (cookieName: string) => string | undefined
  getHeader: () => TIncomingHeaders
  getMethod: () => string | undefined

  bindValue: (key: string, value: TContextBindValue) => void
  getBindedValue: <T extends TContextBindValue>(key: string) => T | undefined

  /** Válasszal kapcsolatos műveletek. */
  sendJson: (data: TAnyObject) => void
  sendError: (err: IGeneralError) => void
  sendNotFound: () => void
  sendUnauthorized: () => void
  sendOk: () => void
  setStatusCode: (statusCode: number) => void
  addHeader: (key: string, value: string) => void
  addHeaders: (headers: TAnyObject) => void
  write: (data: string) => void
  getWrittenStatusCode: () => number
  sendRaw: (statusCode: number, data: TAnyObject, header: http.OutgoingHttpHeaders) => void
}
```

(Jelen pillanatban – 2023. 09. 24. – a kontextus még nem tudja kezelni a FormData típusú kéréseket, de ennek megvalósítása tervben van.)

## Middleware

A Middleware-ek olyan függvények, amelyek a végrehajtási láncolatban kapnak helyet. Ha a láncolat egyik eleme „nem ugrik” a következőre, akkor a végrehajtás megszakad. Az ilyen függvények segítségével lehet könnyen tesztelhető és újrafelhasználható kódot írni.

A Router-ben két típusú Middleware kapott szerepet. Az egyik globális, a másik pedig a lokális.

### Globális

A globális Middleware-ek esetében nem szükséges minden egyes végponthoz explicit hozzárendelni a függvényt, helyette ezt megteszi a Router. Olyan esetekben lehet ez hasznos, ha valamilyen paraméterek szerint – ez lehet akár dinamikus is – szeretnénk megfuttatni egy-egy Middleware-t.

Egy-egy Middleware függvény az alábbiak szerint épül fel.

```typescript
import { IContext, TCallbackFunction } from '@common/Router/definitions'

export default async function exampleMiddleware (ctx: IContext, next: TCallbackFunction): Promise<void> {
  const isOk = await superHeavyTask.do()

  if (!isOk) {
    ctx.sendUnauthorized()

    return
  }

  // Kritikus itt az await használata, különben teljesen elcsúszunk!
  await next(ctx)
}
```

A fenti példa rövid magyarázata az alábbi; ha a `superHeavyTask.do()` esetlegesen `false`-t ad vissza – ez most csak példa, ide bámir jöhetne –, akkor megszakítjuk a kérés futását és visszadobunk egy HTTP 401-es hibakódot.

A `next` paraméter helyén adott Middleware függvényben nem tudjuk, hogy mi jön, elképzelhető, hogy egy másik Middleware, de akár az is, hogy maga a handler callback a következő.

Ahogy a példában is külön ki van emelve, minden esetben `await`-elni kell a `next` függvényt, mert különben az aszinkronitás miatt elcsúszik a végrehajtás.

Ahogy korábban említésre került, a globális middlewarek nem minden esetben hívódnak meg. Ezt mindig egy úgynevezett `matcher` fogja meghatározni.

```typescript
export default function exampleMatcher (ctx: IContext): boolean {
  // Csak akkor hívódjon meg, ha POST a metódus.
  return ctx.getMethod() === 'post'
}
```

Így, hogy ismerjük a globális Middlewarek felépítését, már csak azok regisztrálása van hátra.

```typescript
import { Middleware } from '@common/Router/Middleware'

const mw = new Middleware(exmapleMiddleware, matcher)

router.registerMiddleware(mw)
```

Ahogy a `Middleware` konstruktorból látató, nem kötelező `matcher` függvényt megadni. Abban az esetben, ha az hiányzik, akkor egy minden esetre `true`-t visszaadó függvény kerül a helyére.

### Lokális

A korábban bemutatott Middleware-ekkel ellentétben, itt mindig egy adott végponthoz csatoljuk a Middleware-t. Itt viszont nincs `matcher`, hiszen explicit megadtuk, hogy melyik végpont futtatása előtt hajtódjon végre.

```typescript
rotuer.get('/api/products', getCallback).registerMiddleware(exampleMiddleware)
```

### Egyéb tudnivalók

Amint már említettem, nagyon fontos, hogy a Middleware függvények belsejében mindig meg legyen várva a `next` (nem tudom elégszer hangsúlyozni, hogy ez mennyire fontos).

Emellett jó tudni a sorrendet. A bejövő kontextus alapján a Router először a globális Middlewarek között keres illeszkedőket, majd utána a végponthoz csatoltakat fűzi össze. A sorrend minden esetben meg fog egyezni az eredeti regisztrálás sorrendjével.

## Tesztelés

Nehány általam helyesnek gondolt eljárás az egyes komponensek tesztelésére.

### Middleware

```typescript
const nextFn = jest.fn()

import exampleMiddleware from '../exampleMiddleware'

describe('exampleMiddleware', () => {
  test('...', async () => {
    const mockContext = {
      // ...
    }

    await exampleMiddleware(mockContext as any, nextFn as any)

    expect(nextFn).toHaveBeenCalledOnce()
    // expect(nextFn).not.toHaveBeenCalled()
  })
})
```

### Callback

```typescript
import getCallback from '../getCallback'

describe('getCallback', () => {
  test('...', async () => {
    const mockContext = {
      sendError: jest.fn(),
      sendJson: jest.fn()
    }

    await getCallback(mockContext as any)

    expect(mockContext.sendError).not.toHaveBeenCalled()
    expect(mockContext.sendJson).toHaveBeenCalledOnce()

    expect(mockContext.sendJson.mock.calls[0][0]).toStrictEqual({
      data: {
        name: 'mock'
      }
    })
  })
})
```

## FYI

Itt pedig pár olyan információt találsz, amely inkább csak `good-to-know` és nem feltétlenül befolyásolja a mindennapi munkádat.

### Radix fa

A végpontok tárolásáért egy úgynevezett `radix fa` a felelős, amely hatékony szövegtárolásra alkalmas. [LINK](https://en.wikipedia.org/wiki/Radix_tree)

### Automatikus postData kiolvasás és feldolgozás

A Router minden bejövő `POST` és `PUT` metódus esetén kiolvassa a kérés törzsének a tartalmát, amelyet megpróbál JSON formátumra alakítani (`@common/JSON/JSON`). Ezáltal a fejlesztőnek nincs szüksége arra, hogy ezt ő manuliásan tegye meg. Abban az esetben, ha sikertelen a body feldolgozása, akkor a kiolvasott törzs egy üres object lesz (`{}`).
