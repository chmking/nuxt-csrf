import { fileURLToPath } from 'url'
import {
  defineNuxtModule,
  addPlugin,
  addServerHandler,
  createResolver,
} from '@nuxt/kit'

export interface ModuleOptions {
  addPlugin: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt3-csrf',
    configKey: 'csrf',
  },
  defaults: {
    addPlugin: true,
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

    // Add CSRF server middleware to protect globally
    addServerHandler({
      handler: resolve(runtimeDir, 'server/middleware/csrf'),
    })

    // Add CSRF server plugin to populate composable
    addPlugin(resolve(runtimeDir, 'plugins', 'csrf.server'))

    // Add CSRF composables
    nuxt.hook('authImports:dirs', (dirs) => {
      dirs.push(resolve(runtimeDir, 'composables'))
    })
  },
})
