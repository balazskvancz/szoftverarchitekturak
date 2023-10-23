# Megvalósítandó funckiók

- Bejelentkezés: adott email cím és jelszó páros megadás után userService-cel kommunikálva, létrehozni egy új egyedi „loginHash”-t amihez tároljuk a felhasználó azonosítóját. [user + pass]

  1. User adatok lekerese UserServicetől
  2. Visszakapjuk a User adatokat / hibát hogy nincs ilyen user
  3. user.id-val létezik a **sessions** táblában nyitott session?

      // Igen: return, (vagy bezárjuk az előzőt és újat nyitunk?)
      Vagy lehet mindenképpen újat nyitni, pl ha meg akarjuk engedni hogy a kliens egyszerre legyen bejelentkezve pl gépen és mobilon is.
      Nem: create session return loginHash

- Kijelentkezés: érvényesség „kinullázása”. [loginHash]

  1. **sessions** táblából lekérjük a loginHash alapján a rekordot

      a. Ha nincs ilyen rekord error code

      b. Ha van endedAt mező beállítása

- Adott „loginHash” alapján felhasználó adatok

  1. **sessions** táblából lekérjük a hozzá tartozó UserID-t

  2. UserService-től elkérjük az ID alapján az adatokat

  3. Visszatérés a User adatokkal

- Adott "loginHash" alapján felhasználók jog(ok) szerinti validációja.

  1. **sessions** táblából UserID lekérése
  2. UserService megkérdezése adott ID-hoz milyen jog tartozik?
  3. Jog vissza-adása

  B opció: paraméterként megkapom a kérdezett role-t és igen/nem válasszal térek vissza


## Végpontok

- POST /api/auth/login: bejelentkezés,
- POST /api/auth/logout: kijelentkezés,
- GET /api/auth/check-hash: adott „loginHash”-hez tartozó user teljes adatai,
- GET /api/auth/check-role: adott „loginHash”-hez tartozó user jogosult-e egy adott jogkörre.
