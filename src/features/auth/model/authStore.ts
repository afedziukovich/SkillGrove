import { defineStore } from 'pinia'
import { ref } from 'vue'
import { authApi } from '../api/authApi'
import { supabase } from '@/shared/api/supabaseClient'

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

interface User {
  id: string
  email: string
  name?: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = ref(false)
  const isLoading = ref(true)
  let initPromise: Promise<void> | null = null

  const waitForInit = async () => {
    if (initPromise) {
      await initPromise
    }
  }

  const initAuth = async () => {
    if (initPromise) return initPromise
    initPromise = (async () => {
      try {
        if (USE_MOCK) {
          user.value = null
          isAuthenticated.value = false
        } else {
          const {
            data: { session },
          } = await supabase.auth.getSession()
          if (session?.user) {
            user.value = {
              id: session.user.id,
              email: session.user.email!,
              name: session.user.user_metadata?.name,
            }
            isAuthenticated.value = true
          }
          supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
              user.value = {
                id: session.user.id,
                email: session.user.email!,
                name: session.user.user_metadata?.name,
              }
              isAuthenticated.value = true
            } else {
              user.value = null
              isAuthenticated.value = false
            }
          })
        }
      } finally {
        isLoading.value = false
      }
    })()
    return initPromise
  }

  const login = async (email: string, password: string) => {
    const data = await authApi.signIn({ email, password })
    if (USE_MOCK && data.user) {
      user.value = data.user as User
      isAuthenticated.value = true
    }
  }

  const register = async (email: string, password: string, name: string) => {
    const data = await authApi.signUp({ email, password, name })
    if (USE_MOCK && data.user) {
      user.value = data.user as User
      isAuthenticated.value = true
    }
  }

  const logout = async () => {
    await authApi.signOut()
    if (USE_MOCK) {
      user.value = null
      isAuthenticated.value = false
    }
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    initAuth,
    waitForInit,
    login,
    register,
    logout,
  }
})
