import CsrfModule from '..'

export default defineNuxtConfig({
  modules: [CsrfModule],

  csrf: {
    cookie: {
      name: 'foo',
      sameSite: 'lax',
    },
  },

  compatibilityDate: '2024-09-19',
})