import { defineNuxtConfig } from 'nuxt'
import CsrfModule from '..'

export default defineNuxtConfig({
  modules: [CsrfModule],
  csrf: {
    addPlugin: true,
  },
})
