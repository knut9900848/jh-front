<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    >

    <q-btn label="login" @click="login"></q-btn>
    <q-btn label="Get User" @click="getUser"></q-btn>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import axios from 'axios'

export default defineComponent({
  name: 'PageIndex',

  setup () {
    const form = {
      email: 'knut9900848@gmail.com',
      password: 'secret'
    }
    const login = () => {
      axios.post('http://127.0.0.1/api/login', form)
        .then(response => {
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }

    const getUser = () => {
      axios.get('http://127.0.0.1/api/admin/members')
        .then(response => {
          console.log(response.data)
        })
    }
    return {
      login, form, getUser
    }
  }
})
</script>
