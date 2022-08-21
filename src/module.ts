import { fileURLToPath } from 'url'
import { defineNuxtModule, addServerHandler, createResolver } from '@nuxt/kit'

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

    // Add server middleware
    addServerHandler({
      handler: resolve(runtimeDir, 'server/middleware/csrf'),
    })
  },
})
