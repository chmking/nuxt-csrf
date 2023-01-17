import { defineEventHandler } from 'h3'
import { csrf } from '@chmking/h3-csrf'
import { useRuntimeConfig } from '#imports'

const runtimeOptions = useRuntimeConfig().csrf

// Copy the runtime config because it is read-only
const options = Object.assign({}, runtimeOptions)
options.cookie = Object.assign({}, runtimeOptions.cookie)

// We default maxAge to make is accessible from .env
if (options.cookie.maxAge === 'undefined') {
  options.cookie.maxAge = null
}

if (typeof options.verifiedMethods === 'string') {
  options.verifiedMethods = options.verifiedMethods.split(',')
}

if (!Array.isArray(options.verifiedMethods)) {
  throw new TypeError('csrf verified method must be of type array')
}

export default defineEventHandler(csrf(options))
