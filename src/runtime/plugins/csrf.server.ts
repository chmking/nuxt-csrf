import { useCSRFToken } from '../composables/useCSRFToken'
import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin(() => {
  // Add global route middleware to inject composable access
  addRouteMiddleware(
    'csrf',
    () => {
      const app = useNuxtApp()

      if (!app.ssrContext) {
        return
      }

      const token = useCSRFToken()
      token.value = app.ssrContext.event.req.csrfToken()
    },
    { global: true }
  )
})
