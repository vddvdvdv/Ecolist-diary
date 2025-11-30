// Frontend Database System using IndexedDB and localStorage
// This provides a unified interface for data storage

class Database {
  constructor() {
    this.dbName = 'EkolistDiaryDB'
    this.dbVersion = 1
    this.db = null
    this.init()
  }

  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion)

      request.onerror = () => {
        console.error('IndexedDB error:', request.error)
        reject(request.error)
      }

      request.onsuccess = () => {
        this.db = request.result
        resolve(this.db)
      }

      request.onupgradeneeded = (event) => {
        const db = event.target.result

        // Users table
        if (!db.objectStoreNames.contains('users')) {
          const userStore = db.createObjectStore('users', { keyPath: 'id' })
          userStore.createIndex('email', 'email', { unique: true })
          userStore.createIndex('name', 'name', { unique: false })
        }

        // Diary entries table
        if (!db.objectStoreNames.contains('diaryEntries')) {
          const diaryStore = db.createObjectStore('diaryEntries', { keyPath: 'id' })
          diaryStore.createIndex('userId', 'userId', { unique: false })
          diaryStore.createIndex('date', 'date', { unique: false })
        }

        // Missions table
        if (!db.objectStoreNames.contains('missions')) {
          const missionStore = db.createObjectStore('missions', { keyPath: 'id' })
          missionStore.createIndex('userId', 'userId', { unique: false })
          missionStore.createIndex('status', 'status', { unique: false })
        }

        // Achievements table
        if (!db.objectStoreNames.contains('achievements')) {
          const achievementStore = db.createObjectStore('achievements', { keyPath: 'id' })
          achievementStore.createIndex('userId', 'userId', { unique: false })
          achievementStore.createIndex('type', 'type', { unique: false })
        }

        // Posts table
        if (!db.objectStoreNames.contains('posts')) {
          const postStore = db.createObjectStore('posts', { keyPath: 'id' })
          postStore.createIndex('userId', 'userId', { unique: false })
          postStore.createIndex('createdAt', 'createdAt', { unique: false })
        }

        // EcoPet table
        if (!db.objectStoreNames.contains('ecoPet')) {
          const petStore = db.createObjectStore('ecoPet', { keyPath: 'userId', unique: true })
        }

        // Leaderboard table
        if (!db.objectStoreNames.contains('leaderboard')) {
          const leaderboardStore = db.createObjectStore('leaderboard', { keyPath: 'userId' })
          leaderboardStore.createIndex('points', 'points', { unique: false })
        }
      }
    })
  }

  // Generic CRUD operations
  async add(storeName, data) {
    if (!this.db) await this.init()
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readwrite')
      const store = transaction.objectStore(storeName)
      const request = store.add(data)

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  async get(storeName, key) {
    if (!this.db) await this.init()
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readonly')
      const store = transaction.objectStore(storeName)
      const request = store.get(key)

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  async getAll(storeName, indexName = null, query = null) {
    if (!this.db) await this.init()
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readonly')
      const store = transaction.objectStore(storeName)
      const source = indexName ? store.index(indexName) : store
      const request = query ? source.getAll(query) : source.getAll()

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  async update(storeName, data) {
    if (!this.db) await this.init()
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readwrite')
      const store = transaction.objectStore(storeName)
      const request = store.put(data)

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  async delete(storeName, key) {
    if (!this.db) await this.init()
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readwrite')
      const store = transaction.objectStore(storeName)
      const request = store.delete(key)

      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }

  // Specific methods for common operations
  async getUser(userId) {
    return this.get('users', userId)
  }

  async saveUser(user) {
    return this.update('users', user)
  }

  async getDiaryEntries(userId) {
    return this.getAll('diaryEntries', 'userId', userId)
  }

  async saveDiaryEntry(entry) {
    if (!entry.id) entry.id = Date.now().toString()
    if (!entry.createdAt) entry.createdAt = new Date().toISOString()
    return this.update('diaryEntries', entry)
  }

  async getMissions(userId) {
    return this.getAll('missions', 'userId', userId)
  }

  async saveMission(mission) {
    if (!mission.id) mission.id = Date.now().toString()
    return this.update('missions', mission)
  }

  async getAchievements(userId) {
    return this.getAll('achievements', 'userId', userId)
  }

  async saveAchievement(achievement) {
    if (!achievement.id) achievement.id = Date.now().toString()
    if (!achievement.date) achievement.date = new Date().toISOString()
    return this.update('achievements', achievement)
  }

  async getPosts(userId = null) {
    if (userId) {
      return this.getAll('posts', 'userId', userId)
    }
    return this.getAll('posts')
  }

  async savePost(post) {
    if (!post.id) post.id = Date.now().toString()
    if (!post.createdAt) post.createdAt = new Date().toISOString()
    return this.update('posts', post)
  }

  async getEcoPet(userId) {
    return this.get('ecoPet', userId)
  }

  async saveEcoPet(userId, petData) {
    return this.update('ecoPet', { userId, ...petData })
  }

  async getLeaderboard(limit = 100) {
    const all = await this.getAll('leaderboard')
    return all.sort((a, b) => (b.points || 0) - (a.points || 0)).slice(0, limit)
  }

  async updateLeaderboard(userId, points) {
    const existing = await this.get('leaderboard', userId)
    return this.update('leaderboard', {
      userId,
      points,
      updatedAt: new Date().toISOString(),
      ...existing
    })
  }
}

// Create singleton instance
const database = new Database()

// localStorage fallback for compatibility
export const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch {
      return null
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch {
      return false
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key)
      return true
    } catch {
      return false
    }
  }
}

export default database

