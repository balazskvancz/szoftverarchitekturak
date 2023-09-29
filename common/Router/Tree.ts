import type { IRoute } from './definitions'

import TreeNode   from './TreeNode'
import Validator  from './Validator'

export default class Tree {
  private rootNode: TreeNode | null = null

  /**
   * Beszúrás.
   * @param url   - Az URL végpont.
   * @param route - A tényleges route végpont.
   */
  public insert (url: string, route: IRoute): void {
    if (Validator.isNull(this.rootNode)) {
      this.rootNode = new TreeNode(url, route)

      return
    }

    this.rootNode.insert(url, route)
  }

  /**
   * URL szerinti keresés.
   * @param url - A keresendő URL.
   */
  public find (url: string): TreeNode | null {
    if (Validator.isNull(this.rootNode)) {
      return null
    }

    return this.rootNode.find(url)
  }

  /** Kiírja a fa tartalmát. */
  public print (): void {
    if (Validator.isNull(this.rootNode)) {
      return
    }

    this.rootNode.printDfs(1)
  }
}
