<template>
  <q-page class="q-pa-md">
    <q-responsive :ratio="16/9">
      <q-table
        title="Currency"
        :rows="currencies"
        :columns="columns"
        row-key="name"
        flat
        separator="cell"
        bordered
        table-header-class="text-white bg-blue"
      >
        <template v-slot:top>
          <div class="col-2 q-table__title">Currency</div>

          <q-space />

          <q-btn flat label="Add currency" @click="openCurrencyDialog (0)"></q-btn>
        </template>

        <template v-slot:body-cell-action="props">
          <q-td key="action" :props="props">
            <q-btn
              size="sm"
              color="positive"
              label="Edit" @click="openCurrencyDialog(props.row.id)"/>
          </q-td>
        </template>
      </q-table>
    </q-responsive>

    <teleport to="#dialog-container">
      <q-dialog v-model="dialog"
        persistent
        transition-show="fade"
        transition-hide="fade">
        <CurrencyDialog
          :currencyId="currencyId"
          @add-currency="addCurrency"
          @update-currency="updateCurrency"
        ></CurrencyDialog>
      </q-dialog>
    </teleport>
  </q-page>
</template>

<script>
import { api } from 'src/boot/axios'
import { ref, onMounted } from 'vue'
import CurrencyDialog from './CurrencyDialog.vue'

const columns = [
  {
    name: 'name',
    label: 'Name',
    align: 'left',
    field: 'name'
  },
  {
    name: 'exchange-reate',
    label: 'Exchange Rate',
    align: 'left',
    field: 'exchange_rate'
  },
  {
    name: 'active',
    label: 'Active',
    align: 'left',
    field: 'is_active'
  },
  {
    name: 'action',
    label: 'Action',
    align: 'left',
    field: 'action'
  }
]

const rows = []

export default {
  name: 'Currency',
  components: {
    CurrencyDialog
  },
  setup () {
    const currencies = ref([])
    onMounted(() => {
      api.get('/admin/settings/currencies')
        .then(response => {
          currencies.value = response.data.currencies
        })
    })

    const addCurrency = (payload) => {
      currencies.value.unshift(payload)
    }

    const updateCurrency = (payload) => {
      const targetIndex = currencies.value.findIndex(x => x.id === payload.id)
      Object.assign(currencies.value[targetIndex], payload)
    }

    const dialog = ref(false)
    const currencyId = ref(null)
    const openCurrencyDialog = (id) => {
      dialog.value = true
      currencyId.value = id
    }

    return {
      columns,
      rows,
      currencies,
      dialog,
      openCurrencyDialog,
      currencyId,
      addCurrency,
      updateCurrency
    }
  }
}
</script>
