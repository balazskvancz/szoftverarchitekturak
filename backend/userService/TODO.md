# Megvalósítandó funckiók

- Regisztráció: egy új felhasználó felvétele.
- Felhasználók listázása: futárok, adminok és felhasználók szerint.
- Új futár felvétele: egyéni regisztráció helyett, admin végzi el.
- Felhasználók adatainak módosítása.
- Felhasználók és címek összerendelése.
- Felhasználó(k) törlése.
- new -> undo delete

## Végpontok

- POST /api/user/registration ->  regisztráció.
- GET /api/user/customers -> felhasználók lekérdezése
- DELETE /api/user/customers/:id -> felhasználó törlése
- PUT /api/user/customers/:id -> felhasználó módosítása
- GET /api/user/customers/:id -> felhasználó elkérése azonosító szerint
- GET /api/user/admins -> adminok lekérdezése
- PUT /api/user/admins/:id -> admin módosítása
- DELETE /api/user/admins/:id -> admin törlése
- GET /api/user/admins/:id -> admin elkérése azonosító szerint
- GET /api/user/couriers -> futárok lekérdezése
- POST /api/user/couriers -> új futár felvétele
- PUT /api/user/couriers/:id-> futár módosítása
- GET /api/user/couriers/:id-> futár elkérése azonosító szerint
- DELETE /api/user/couriers/:id-> futár lekérdezése
- PUT /api/user/couriers/set-working-day -> futár munkavállalásának módosítása
- PUT /api/user/undo-delete/:id -> törlés visszaállítása
