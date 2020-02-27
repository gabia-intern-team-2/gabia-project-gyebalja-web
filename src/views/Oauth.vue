<template>
  <div>
    hi
  </div>
</template>

<script>

import axios from 'axios'

export default {
  created () {
    console.log('hello')
    axios.post('http://localhost:8282/auth/callback')
      .then(response => console.log(response))
      .catch(error => console.log(error))
  }
}
</script>

<style>

</style>
