const STORAGE_KEY = 'orderHistory'

export const orderHistoryRepository = {
  async load() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  },

  async save(history) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
  },

  async clear() {
    localStorage.removeItem(STORAGE_KEY)
  }
}
