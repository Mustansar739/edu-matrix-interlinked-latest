/**
 * No-op storage for server-side rendering
 * Prevents Redux Persist from trying to access localStorage on the server
 */

export interface NoopStorage {
  getItem(key: string): Promise<null>
  setItem(key: string, value: string): Promise<void>
  removeItem(key: string): Promise<void>
}

export function createNoopStorage(): NoopStorage {
  return {
    getItem(_key: string): Promise<null> {
      return Promise.resolve(null)
    },
    setItem(_key: string, _value: string): Promise<void> {
      return Promise.resolve()
    },
    removeItem(_key: string): Promise<void> {
      return Promise.resolve()
    },
  }
}
