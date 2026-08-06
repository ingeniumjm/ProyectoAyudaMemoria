import { create } from 'zustand'
import usuariosRaw from '../data/usuarios.json'

// Tipo del usuario
interface User {
  id: string
  email: string
  password: string
  role: string
  fullName: string
}

const usuarios = usuariosRaw as User[]
const STORAGE_KEY = 'ayudamemoria_session'

// Leer sesión guardada al recargar la página
function loadSession(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  error: string | null
  login: (email: string, password: string) => boolean
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: loadSession(),
  isAuthenticated: loadSession() !== null,
  error: null,

  login: (email, password) => {
    const found = usuarios.find((u) => u.email === email)

    if (!found) {
      set({ error: 'No existe un usuario con ese correo.' })
      return false
    }
    if (found.password !== password) {
      set({ error: 'Contraseña incorrecta.' })
      return false
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(found))
    set({ user: found, isAuthenticated: true, error: null })
    return true
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY)
    set({ user: null, isAuthenticated: false, error: null })
  },
}))