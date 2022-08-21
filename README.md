# Nuxt CSRF 

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

## Cookies

Currently this package only supports the default config from `@chmking/h3-csrf` which will add a cookie `_csrf` upon initial request to the server.

## Development

You can develop locally with the playground:
- Run `npm run dev:prepare` to generate type stubs.
- Use `npm run dev` to start [playground](./playground) in development mode.

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.