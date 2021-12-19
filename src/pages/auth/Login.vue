<template>
  <q-page class="bg-light-blue row justify-center items-center">
    <div class="column">
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input square filled type="email" v-model="email" label="email" />
              <q-input square filled type="password" v-model="password" label="password" />
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn unelevated color="light-blue-7" size="lg" class="full-width" label="Login" @click="submit" />
          </q-card-actions>
          <q-card-section class="text-center q-pa-none">
            <p class="text-grey-6">Not reigistered? Created an Account</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
  setup () {
    const store = useStore()
    const email = ref('')
    const password = ref('')
    const submit = () => store.dispatch('auth/LOGIN', { email: email.value, password: password.value })

    return {
      submit, email, password
    }
  }
}
</script>

<style>
.q-card {
  width: 480px;
}
</style>
