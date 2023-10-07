# Megvalósítandó funckiók

- Csomagok életútja: mikor, mi történt melyik csomaggal. Lekérdezés ÉS beszúrása.
- Csomagok lekérdezése ÉS beszúrása.
- Méretek kezlése.

## Végpontok

- POST /api/package/packages -> Egy új csomag felvétele.
- GET /api/package/packages -> Felvett csomagok lekérdezése.
- GET /api/package/packages/:id -> Egy adott „id”-val rendelkező csomag adatainak elkérése.
- POST /api/package/lifecycles/:id -> Egy új életciklus beszúrása egy adott „id”-val rendelkező csomaghoz.
- POST /api/package/dimensions -> Egy új méret felvétele
- GET /api/package/dimensions -> Az összes méret lekérdezése.
