import { useCSRFToken } from '../composables/useCSRFToken'
import { defineNuxtPlugin, addRouteMiddleware } from '#imports'

export default defineNuxtPlugin((nuxtApp) => {
  // Add global route middleware to inject composable access
  addRouteMiddleware(
    'csrf',
    () => {
      if (!nuxtApp.ssrContext) {
        return
      }

      const token = useCSRFToken()
      token.value = nuxtApp.ssrContext.event.req.csrfToken()
    },
    { global: true }
  )
})
