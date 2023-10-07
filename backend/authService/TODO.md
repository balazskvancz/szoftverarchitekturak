# Megvalósítandó funckiók

- Bejelentkezés: adott email cím és jelszó páros megadás után userService-cel kommunikálva, létrehozni egy új egyedi „loginHash”-t amihez tároljuk a felhasználó azonosítóját.
- Kijelentkezés: érvényesség „kinullázása”.
- Jog lekérdezés: adott „loginHash” alapján felhasználó adatok ÉS jog(ok) szerinti validációja.

## Végpontok

- POST /api/auth/login: bejelentkezés,
- POST /api/auth/logout: kijelentkezés,
- GET /api/auth/check-hash: adott „loginHash”-hez tartozó user teljes adatai,
- GET /api/auth/check-role: adott „loginHash”-hez tartozó user jogosult-e egy adott jogkörre.
