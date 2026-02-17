import { create } from 'zustand'

export interface User {
  id: string
  name: string
  email: string
  avatar: string
}

interface AuthStore {
  user: User | null
  token: string | null
  isLoading: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  checkAuth: () => void
}

const DUMMY_USERS: Record<string, any> = {
  'user': {
    username: 'user',
    password: 'user',
    id: '1',
    name: 'Mario Rossi',
    email: 'mario@crm.it',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MarioRossi',
  },
  'admin': {
    username: 'admin',
    password: 'admin',
    id: '2',
    name: 'Admin User',
    email: 'admin@crm.it',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AdminUser',
  }
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isLoading: false,

  login: async (username: string, password: string) => {
    set({ isLoading: true })
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const user = DUMMY_USERS[username]
    if (!user || user.password !== password) {
      set({ isLoading: false })
      return false
    }

    const token = btoa(JSON.stringify({ id: user.id, username, iat: Date.now() }))
    const userData: User = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    }
    
    localStorage.setItem('auth_token', token)
    localStorage.setItem('user', JSON.stringify(userData))
    set({ user: userData, token, isLoading: false })
    return true
  },

  logout: () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user')
    set({ user: null, token: null })
  },

  checkAuth: () => {
    const token = localStorage.getItem('auth_token')
    const user = localStorage.getItem('user')
    if (token && user) {
      try {
        set({ user: JSON.parse(user), token })
      } catch (e) {
        set({ user: null, token: null })
      }
    }
  }
}))
