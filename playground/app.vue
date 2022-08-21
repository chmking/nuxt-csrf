<template>
  <div>
    <h1>Form Without Token</h1>
    <form method="post" action="/api/test">
      <input type="submit" value="Submit" />
    </form>

    <h1>Form With Token</h1>
    <form method="post" action="/api/test">
      <input name="_csrf" type="hidden" :value="csrf" />
      <input type="submit" value="Submit" />
    </form>

    <h1>AJAX Without Token</h1>
    <button @click="onClick('')">Submit</button>

    <h1>AJAX With Token</h1>
    <button @click="onClick(csrf)">Submit</button>
  </div>
</template>

<script setup lang="ts">
import { FetchOptions } from 'ohmyfetch'
import { useCSRFToken } from '../src/runtime/composables/useCSRFToken'

const csrf = useCSRFToken()

function onClick(token: string) {
  const opts: FetchOptions = {
    method: 'POST',
  }

  if (token !== '') {
    opts.body = {
      _csrf: token,
    }
  }

  $fetch('/api/test', opts)
    .then(() => {
      console.log('success')
    })
    .catch((e) => {
      console.log(e.data.message)
    })
}
</script>
