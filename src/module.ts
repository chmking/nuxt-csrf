import { fileURLToPath } from 'url'
import {
  defineNuxtModule,
  addPlugin,
  addServerHandler,
  createResolver,
  addTemplate,
} from '@nuxt/kit'
import type { Options } from '@chmking/h3-csrf'

export default defineNuxtModule<Options>({
  meta: {
    name: 'nuxt-csrf',
    configKey: 'csrf',
  },
  defaults: {
    cookie: {
      name: '_csrf',
      path: '/',
    },
  },
  setup(options, nuxt) {
    // Allow environment override for CSRF config
    envOverride(options)

    const { resolve } = createResolver(import.meta.url)

    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

    addTemplate({
      filename: 'server/middleware/csrf.ts',
      write: true,
      getContents: () =>
        [
          `import { defineEventHandler } from 'h3'`,
          `import { csrf } from '@chmking/h3-csrf'`,
          `export default defineEventHandler(csrf(${JSON.stringify(options)}))`,
        ].join('\n'),
    })

    // Add CSRF server middleware to protect globally
    addServerHandler({
      handler: resolve(nuxt.options.buildDir, 'server/middleware/csrf'),
    })

    // Add CSRF server plugin to populate composable
    addPlugin(resolve(runtimeDir, 'plugins', 'csrf.server'))

    // Add CSRF composables
    nuxt.hook('autoImports:dirs', (dirs) => {
      dirs.push(resolve(runtimeDir, 'composables'))
    })
  },
})

function envOverride(options: Options) {
  // CSRF cookie domain (string)
  options.cookie.domain =
    process.env.NUXT_CSRF_COOKIE_DOMAIN || options.cookie.domain

  // CSRF cookie http only (boolean)
  let envHttpOnly = process.env.NUXT_CSRF_COOKIE_HTTP_ONLY
  if (envHttpOnly !== undefined && envHttpOnly !== '') {
    envHttpOnly = envHttpOnly.toLowerCase()
    options.cookie.httpOnly = envHttpOnly !== 'false'
  }

  // CSRF cookie max age (number)
  const envMaxAge = process.env.NUXT_CSRF_COOKIE_MAX_AGE
  if (envMaxAge !== undefined && envMaxAge !== '') {
    options.cookie.maxAge = Number(envMaxAge)
  }

  // CSRF cookie name (string)
  options.cookie.name = process.env.NUXT_CSRF_COOKIE_NAME || options.cookie.name

  // CSRF cookie path (string)
  options.cookie.path = process.env.NUXT_CSRF_COOKIE_PATH || options.cookie.path

  // CSRF cookie same site (boolean | 'lax' | 'strict' | 'none')
  let envSameSite = process.env.NUXT_CSRF_COOKIE_SAME_SITE
  if (envSameSite !== undefined && envSameSite !== '') {
    envSameSite = envSameSite.toLowerCase()

    if (
      envSameSite === 'lax' ||
      envSameSite === 'strict' ||
      envSameSite === 'none'
    ) {
      options.cookie.sameSite = envSameSite
    }

    options.cookie.sameSite = envSameSite !== 'false'
  }

  // CSRF cookie secure (boolean)
  let envSecure = process.env.NUXT_CSRF_COOKIE_SECURE
  if (envSecure !== undefined && envSecure !== '') {
    envSecure = envSecure.toLowerCase()
    options.cookie.secure = envSecure !== 'false'
  }
}

function convert<Type>(env: string, opt: Type): Type {
  if (env === '') {
    return opt
  }
  return env as unknown as Type
}
