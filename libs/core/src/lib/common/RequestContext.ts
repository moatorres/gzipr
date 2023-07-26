/**
 * Represents a context object that contains information about an HTTP request.
 */
export class RequestContext {
  private data: Map<string, any> = new Map()

  /**
   * Gets a value from the context object.
   * @param key The key of the value to get.
   * @returns The value associated with the key, or undefined if the key is not found.
   */
  get<T>(key: string): T {
    return this.data.get(key)
  }

  /**
   * Sets a value in the context object.
   * @param key The key of the value to set.
   * @param value The value to set.
   */
  set<T>(key: string, value: T): void {
    this.data.set(key, value)
  }
}
