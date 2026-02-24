import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './app/router'
import './index.css'
import App from '@/app/App.vue'
import { useAuthStore } from '@/features/auth/model/authStore'

async function bootstrap() {
  const app = createApp(App)
  const pinia = createPinia()
  app.use(pinia)
  app.use(router)

  const authStore = useAuthStore()
  await authStore.initAuth()

  app.mount('#app')
}

bootstrap()
