import { fileURLToPath } from 'url'
import {
  defineNuxtModule,
  addPlugin,
  addServerHandler,
  createResolver,
} from '@nuxt/kit'
import { defu } from 'defu'
import type { Options } from '@chmking/h3-csrf'

export default defineNuxtModule<Options>({
  meta: {
    name: 'nuxt-csrf',
    configKey: 'csrf',
  },
  defaults: {
    cookie: {
      domain: '',
      httpOnly: true,
      name: '_csrf',
      path: '/',
      sameSite: 'lax',
      secure: false,
    },
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

    nuxt.options.runtimeConfig.csrf = defu(nuxt.options.runtimeConfig.csrf, {
      cookie: {
        domain: options.cookie.domain,
        httpOnly: options.cookie.httpOnly,
        name: options.cookie.name,
        path: options.cookie.path,
        sameSite: options.cookie.sameSite as string,
        secure: options.cookie.secure,

        // The following defaults are set to enable access via .env
        maxAge: 'undefined',
      },
    })

    // Add CSRF server middleware to protect globally
    addServerHandler({
      handler: resolve(runtimeDir, 'server/middleware/csrf'),
    })

    // Add CSRF server plugin to populate composable
    addPlugin(resolve(runtimeDir, 'plugins', 'csrf.server'))

    // Add CSRF composables
    nuxt.hook('autoImports:dirs', (dirs) => {
      dirs.push(resolve(runtimeDir, 'composables'))
    })
  },
})
