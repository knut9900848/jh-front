<template>
  <q-card>
    <q-toolbar class="bg-blue">
      <q-toolbar-title>
        Currency
      </q-toolbar-title>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-toolbar>

    <TheAlert :errors="errors"/>

    <q-form class="q-gutter-md">
      <q-card-section class="q-pa-md">
        <div class="row">
          <div class="col-6 q-pa">
            <q-input
              class="q-pa-sm"
              dense
              outlined
              label="Currency Name"
              v-model="currency.name" />
          </div>
          <div class="col-6">
            <q-input
              class="q-pa-sm"
              dense
              outlined
              label="Exchange Rate"
              v-model="currency.exchange_rate" />
          </div>
          <div class="col-6">
            <q-input
              class="q-pa-sm"
              dense
              outlined
              label="Symbol"
              v-model="currency.symbol" />
          </div>
          <div class="col-6">
            <q-input
              class="q-pa-sm"
              dense
              outlined
              label="Country"
              v-model="currency.country" />
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pa-md">
        <div class="row">
          <div class="col">
            <q-input
              type="textarea"
              label="Description"
              outlined
              v-model="currency.description" />
          </div>
        </div>

        <q-separator />

        <div class="row">
          <div class="col">
            <q-toggle
              label="Activation"
              v-model="currency.is_active"/>
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
import { onMounted, ref, reactive } from 'vue'
import { api } from 'src/boot/axios'
import { useQuasar } from 'quasar'
import TheAlert from 'src/components/global/TheAlert.vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, email } from '@vuelidate/validators'

export default {
  name: 'CurrencyDialog',
  components: {
    TheAlert
  },
  props: {
    currencyId: Number
  },

  setup (props, { emit }) {
    const $q = useQuasar()
    const errors = ref([])
    const currency = reactive({
      id: '',
      name: '',
      exchange_rate: 1,
      country: '',
      description: '',
      is_active: false
    })

    // const rules = computed(() => {
    //   return {
    //     name: { required, minLength: minLength(6), email },
    //     kor_name: { required, email },
    //     code: { required }
    //   }
    // })

    const rules = {
      name: { required, minLength: minLength(6), email },
      kor_name: { required, email },
      code: { required }
    }

    const v$ = useVuelidate(rules, currency)

    if (props.currencyId !== 0) {
      onMounted(() => {
        api.get('/admin/settings/currencies/' + props.currencyId)
          .then(response => {
            Object.assign(currency, response.data.currency)
          })
      })
    }

    const createCurrency = () => {
      $q.loading.show()
      api.post('/admin/settings/currencies', currency)
        .then(response => {
          currency.value = response.data.currency
          emit('add-currency', response.data.currency)
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

    const updateCurrency = () => {
      $q.loading.show()
      api.put('/admin/settings/currencies/' + props.currencyId, currency)
        .then(response => {
          currency.value = response.data.currency
          emit('update-currency', response.data.currency)
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

    const save = () => props.currencyId === 0
      ? createCurrency()
      : updateCurrency()

    return {
      currency,
      save,
      errors,
      v$
    }
  }
}
</script>
