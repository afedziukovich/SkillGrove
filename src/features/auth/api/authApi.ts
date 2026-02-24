/* global setTimeout */
import { supabase } from '@/shared/api/supabaseClient'

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

interface SignInCredentials {
  email: string
  password: string
}

interface SignUpData extends SignInCredentials {
  name: string
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const authApi = {
  async signIn(credentials: SignInCredentials) {
    if (USE_MOCK) {
      await delay(500)
      return { user: { id: '1', email: credentials.email, name: 'Mock User' } }
    }
    const { data, error } = await supabase.auth.signInWithPassword(credentials)
    if (error) throw error
    return data
  },

  async signUp(data: SignUpData) {
    if (USE_MOCK) {
      await delay(500)
      return { user: { id: '2', email: data.email, name: data.name } }
    }
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: { data: { name: data.name } },
    })
    if (error) throw error
    return authData
  },

  async signOut() {
    if (USE_MOCK) {
      await delay(300)
      return
    }
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },
}
