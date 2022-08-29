import { defineNuxtConfig } from 'nuxt'
import CsrfModule from '..'

export default defineNuxtConfig({
  modules: [CsrfModule],
  csrf: {
    cookie: {
      name: 'foo',
      sameSite: 'lax',
    },
  },
})
