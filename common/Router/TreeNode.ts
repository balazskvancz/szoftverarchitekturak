import type { IRoute } from './definitions'

import getLongestCommonPrefix from './utils/getLongestCommonPrefix'
import getOffset from './utils/getOffset'

import Validator from './Validator'

export default class TreeNode {
  private urlPart: string
  private value: IRoute | null
  // eslint-disable-next-line no-use-before-define
  private children: TreeNode[]

  public constructor (urlPart: string, value: IRoute | null, children?: TreeNode[]) {
    this.urlPart  = urlPart
    this.value    = value
    this.children = children ?? []
  }

  /** Megmondja egy adott csomópontról, hogy ő éppen levél-e. */
  public isLeaf (): boolean {
    return !Validator.isNull(this.value)
  }

  /**
   * Egy új végpont felvétele.
   * @param url   - URL.
   * @param value - Handler.
   */
  public insert (url: string, value: IRoute): boolean {
    const commonLength = getLongestCommonPrefix(this.urlPart, url)

    // Ha nincs közös rész, akkor ezen az ágon végeztünk.
    if (commonLength === 0) {
      return false
    }

    // Ilyenkor elképzelhető, hogy pont ott vagyunk, ahova be akarjuk szórni.
    if (this.urlPart === url) {
      if (this.isLeaf()) {
        return true
      }

      this.value = value

      return true
    }

    // A következőkben két lehetőség áll fent:
    //  1) a jelenlegi csomópont kulcsa hosszabb, mint a közös rész => ekkor „kulcsosztás”,
    //  2) a beszúrandó kulcs hosszabb, mint a közös rész, akkor további két lehetőség állhat fent:
    //    2a) folytatjuk a keresést a gyerekek között rekurzívan
    //    2b) ha nem volt beszúrás a gyerek között, akkor viszont a jelenlegi csomópont gyerekei közé kell beszúrni.
    if (this.urlPart.length > commonLength) {
      const newChildKeyRem = this.urlPart.slice(commonLength)

      const newTobeChild = new TreeNode(newChildKeyRem, this.value, this.children)

      const keyRem = url.slice(commonLength)

      // Abban az esetben, ha már nem lenne maradék, akkor viszont ide kell, hogy kerüljön.
      // Mivel itt már volt egy kulcsosztás, itt nem kell vizsgálni arra, hogy
      // a csomópont már levél lenne.
      if (keyRem === '') {
        this.urlPart  = url.slice(0, commonLength)
        this.value    = value
        this.children = [ newTobeChild ]

        return true
      }

      const newNode = new TreeNode(keyRem, value)

      this.value    = null
      this.urlPart  = this.urlPart.slice(0, commonLength)
      this.children = [ newTobeChild, newNode ]

      return true
    }

    // Ha ide eljutunk, akkor már tudhatjuk, hogy a közös rés
    const keyRem = url.slice(commonLength)

    const areDealtWithRecursively = this.children.some((el) => el.insert(keyRem, value))

    // Akkor kaphatunk itt `true`-t, ha be tudtuk szúrni
    // VAGY az adott URL-t egyszer már tartalmazza.
    //
    // Így, csak akkor kell ezen a szinten a gyerekek közé
    // beszúrni, ha itt `false`-t kaptunk.
    if (!areDealtWithRecursively) {
      this.children.push(new TreeNode(keyRem, value))
    }

    return true
  }

  /**
   * URL szerinti keresés.
   * @param url - A keresendő URL.
   */
  public find (url: string): TreeNode | null {
    const found = this.findRec(url, false)

    return found
  }

  /**
   * Rekurzív keresés a fában.
   * @param url   - A keresendő URL.
   * @param isWildcard - Éppen wildcarban vagyunk-e.
   */
  public findRec (url: string, isWildcard: boolean): TreeNode | null {
    const offset = getOffset(this.urlPart, url, isWildcard)

    if (offset.keyOne !== this.urlPart.length) {
      return null
    }

    const searchKeyRem = url.slice(offset.keyTwo)

    if (searchKeyRem === '') {
      return this.isLeaf() ? this : null
    }

    // Végigmegyünk az adott comópont gyerekein a kulcs maradékával.
    const foundNode = this.children.reduce((acc, curr) => {
      const node = curr.findRec(searchKeyRem, offset.isWildcard)

      if (!Validator.isNull(node)) {
        return node
      }

      return acc
    }, null as TreeNode | null)

    // Ha éppen megtaláltuk a gyerekek között amit kerestünk, akkor meg is vagyunk.
    if (!Validator.isNull(foundNode)) {
      return foundNode
    }

    // Ha pedig itt jutunk, akkor ne kizárt, hogy pont ott vagyunk, ahova tartozunk.
    // Ilyenkor azt kell megnézni, hogy wildcard lehet-e.
    if (!offset.isWildcard) {
      return null
    }

    // Különben meg kell nézni, hogy van-e még a maradékben '/'.
    const nextSlashIndex = searchKeyRem.indexOf('/')

    // Ha nincs '/', akkor azt jelenti, hogy az utolsó paraméter is egy wildcard,
    // és akkor pont azon a levelen vagyunk, amit meg kellett találni.
    // Ám, ha még mondjuk '5/foo'-szerű maradék van, akkor értelemszerűen nincs találat.
    return nextSlashIndex === -1 ? this : null
  }

  /** Visszaadja a tárolt értéket. */
  public getValue (): IRoute | null {
    return this.value
  }

  /**
   * Segédfüggvény a kirajzolásra.
   * @param lvl - Szint.
   */
  public printDfs (lvl: number): void {
    const text = `[szint: ${ lvl }] tárolt érték: ${ this.urlPart } levél-e: ${ this.isLeaf() }`

    // eslint-disable-next-line no-console
    console.log(text)

    this.children.forEach((el) => el.printDfs(lvl + 1))
  }
}
