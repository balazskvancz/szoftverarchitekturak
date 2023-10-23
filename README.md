# Szoftverarchitektúrák

BME MSc szoftverarchitektúrák c. közös tárgy házifeledat repositoryja.

A választott feladat: Csomagkézbesítési logisztikai rendszer

## Feladatleírás

A hallgatói csapat célja egy logisztikai rendszer tervezése és fejlesztése, amin keresztül a felhasználók tudnak csomagot feladni és nyomonkövetni a feladott csomagjaikat, a futárok egy külön alkalmazásban pedig képesek adminsztrálni a csomagok kézbesítésének folyamatát. Opcionálisan kialakítható olyan folyamat is, ahol a kézbesítés nem pontos címre, hanem csomagautomatába történik

## Architektúra

A választott szerveroldali architektúra a `mikroszervíz` alapú tervezést követi. Az összes egység megtalálható a `backend/*Service` alatt.

## Indítás

### Szolgáltatások

Az egyes projektek indítási útmutatója megtalálható azok `README.md`-jében.

### Gateway

Az architektúrában szerepett kapott egy API Gateway is, amelynek a belépési pontja `/gateway/cmd` mappában található. A Gateway konfigurálása a `config.json` fájl alapján történik, amelyre található egy `template` az említett mappában – indítás előtt, létre kell hozni saját a konfigot, amely `gitignore`-os.

A Gateway-nek három indítási módja van:
- ha van `Go` környezet telepítve a gépeden, akkor egyszerűen: `go run .` parancs a `cmd` mappában,
- ha `Windows` operációs rendszert használsz, akkor a `cmd` mappában található `gateway.exe` indítása a megoldás,
- ha `Linux` operációs rendszert használsz, akkor szintén a `cmd` mappában található `gateway` bináris fájl indítása a megoldás.

#### Mikor van szükség a Gateway indítására?

Minden olyan esetben szükség van rá, amikor a te általad fejlesztett szolgáltatás egy másik szolgáltatással kommunikál. A `backend/Communicator/Communicator` a Gateway-t fogja minden kéréssel megcímezni, amelyet majd az fog továbbítani a megfelelő cél felé – betölött konfig alapján.
