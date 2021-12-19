<template>
  <q-card>
    <q-toolbar class="bg-blue">
      <q-toolbar-title>
        Brach
      </q-toolbar-title>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-toolbar>

    <TheAlert :errors="errors"/>

    <p
      v-for="(error, index) of v$.name.$errors"
      :key="index"
    >
    <strong>{{ error.$validator }}</strong>
    <small> on property</small>
    <strong>{{ error.$property }}</strong>
    <small> says:</small>
    <strong>{{ error.$message }}</strong>
    </p>

    <q-form class="q-gutter-md">
      <q-card-section class="q-pa-md">
        <div class="row">
          <div class="col-4 q-pa">
            <q-input
              class="q-pa-sm"
              dense
              outlined
              label="Bank Account Name"
              v-model="bankAccount.name" />
          </div>

          <div class="col-4">
            <q-input
              class="q-pa-sm"
              dense
              outlined
              label="Korean Name"
              v-model="bankAccount.kor_name" />
          </div>

          <div class="col-4">
            <q-input
              class="q-pa-sm"
              dense
              outlined
              label="Account Numbe"
              v-model="bankAccount.account_number" />
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pa-md">
        <div class="row">
          <div class="col-6">
            <q-input
              class="q-pa-sm"
              dense
              outlined
              label="Swift Code"
              v-model="bankAccount.swift_code" />
          </div>
          <div class="col-6">
            <q-input
              class="q-pa-sm"
              dense
              outlined
              label="Bank Address"
              v-model="bankAccount.address" />
          </div>
        </div>

        <q-separator />

        <div class="row">
          <div class="col">
            <q-toggle
              label="Activation"
              v-model="bankAccount.is_active"/>
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat @click="save()">Save</q-btn>
        <q-btn flat v-close-popup>Close</q-btn>
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import { onMounted, reactive, ref } from 'vue'
import { api } from 'src/boot/axios'
import { useQuasar } from 'quasar'
import TheAlert from 'src/components/global/TheAlert.vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, email } from '@vuelidate/validators'

export default {
  name: 'BankAccountDialog',
  components: {
    TheAlert
  },
  props: {
    bankAccountId: Number
  },

  setup (props, { emit }) {
    const $q = useQuasar()
    const errors = ref([])
    const bankAccount = reactive({
      id: '',
      name: '',
      kor_name: '',
      account_number: '',
      swift_code: '',
      address: '',
      is_active: false,
      description: ''
    })

    console.log(bankAccount)

    const rules = {
      name: { required, minLength: minLength(6), email },
      kor_name: { required, email },
      code: { required }
    }

    const v$ = useVuelidate(rules, bankAccount)

    if (props.bankAccountId !== 0) {
      onMounted(() => {
        api.get('/admin/settings/bank-accounts/' + props.bankAccountId)
          .then(response => {
            Object.assign(bankAccount, response.data.bankAccount)
          })
      })
    }

    const createBankAccount = () => {
      $q.loading.show()
      console.log('Bank Account', bankAccount)
      api.post('/admin/settings/bank-accounts', bankAccount)
        .then(response => {
          console.log(response.data)
          bankAccount.value = response.data.bankAccount
          emit('add-bankAccount', response.data.bankAccount)
          $q.notify({
            message: response.data.message,
            color: 'primary',
            actions: [
              { label: 'Dismiss', color: 'white' }
            ]
          })
        })
        .catch(error => {
          console.log('ERROr', error.response.data.errors)
          errors.value = error.response.data.errors
          $q.notify({
            message: error.response.data.message,
            actions: [
              { label: 'Dismiss', color: 'white' }
            ]
          })
        })
        .finally(() => $q.loading.hide())
    }

    const updateBankAccount = () => {
      $q.loading.show()
      api.put('/admin/settings/bank-accounts/' + props.bankAccountId, bankAccount)
        .then(response => {
          bankAccount.value = response.data.bankAccount
          emit('update-bankAccount', response.data.bankAccount)
          $q.notify({
            message: response.data.message,
            actions: [
              { label: 'Dismiss', color: 'white' }
            ]
          })
        })
        .catch(error => {
          errors.value = error.response.data.errors
          console.log('ERROr', error.response.data.errors)
          $q.notify({
            message: error.response.data.message,
            actions: [
              { label: 'Dismiss', color: 'white' }
            ]
          })
        })
        .finally(() => $q.loading.hide())
    }

    const save = () => props.bankAccountId === 0
      ? createBankAccount()
      : updateBankAccount()

    return {
      bankAccount,
      save,
      errors,
      v$
    }
  }
}
</script>
