# Nuxt CSRF 

CSRF support for Nuxt

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/). Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```sh
$ npm install @chmking/nuxt-csrf
```

Add to modules in `nuxt.config.ts`:

```js
// nuxt.config.ts
export default defineNuxtConfig({
    modules: [ '@chmking/nuxt-csrf' ]
})
```

## Usage

### Get Token

This module makes the token available through a composable:

```js
<script setup lang="ts">
const token = useCSRFToken();
</script>
```

### Form

```js
<template>
  <div>
    <form method="POST" action="/api/test">
      <input name="_csrf" type="hidden" :value="token" />
      <input type="submit" value="Submit" />
    </form>
  </div>
</template>

<script setup lang="ts">
const token = useCSRFToken();
</script>
```

### AJAX

```js
<template>
  <div>
    <button @click="onClick">Submit</button>
  </div>
</template>

<script setup lang="ts">
const token = useCSRFToken();

function onClick() {
  $fetch("/api/test", {
    method: "POST",
    body: {
      _csrf: token.value,
    },
  });
}
</script>
```

## Options

Currently Nuxt CSRF only supports cookies for CSRF secret storage.

### Cookies

Nuxt CSRF can be configured with the cookie options from `@chmking/h3-csrf`.

Default:
```js
{
  cookie: {
    domain: '',
    httpOnly: true,
    name: '_csrf',
    path: '/',
    sameSite: 'lax',
    secure: false,
  },
}
```

## Environment Override

In support of 12 factor app principles, environment overrides are available for cookie config.

This will override the modules config in `nuxt.config.ts`.

- NUXT_CSRF_COOKIE_DOMAIN
- NUXT_CSRF_COOKIE_HTTP_ONLY
- NUXT_CSRF_COOKIE_MAX_AGE
- NUXT_CSRF_COOKIE_NAME
- NUXT_CSRF_COOKIE_PATH
- NUXT_CSRF_COOKIE_SAME_SITE
- NUXT_CSRF_COOKIE_SECURE

In a production environment with the server running on HTTPS a more secure config is:

```bash
NUXT_CSRF_COOKIE_SAME_SITE="strict"
NUXT_CSRF_COOKIE_SECURE="true"
```

## Development

You can develop locally with the playground:
- Run `npm run dev:prepare` to generate type stubs.
- Use `npm run dev` to start [playground](./playground) in development mode.

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.