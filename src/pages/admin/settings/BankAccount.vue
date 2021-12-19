<template>
  <q-page class="q-pa-md">
    <q-responsive :ratio="16/9">
      <q-table
        title="Bank Accounts"
        :rows="bankAccounts"
        :columns="columns"
        row-key="name"
        flat
        separator="cell"
        bordered
        table-header-class="text-white bg-blue"
      >
        <template v-slot:top>
          <div class="col-2 q-table__title">Treats</div>

          <q-space />

          <q-btn flat label="Add BankAccount" @click="openBankAccountDialog (0)"></q-btn>
        </template>

        <template v-slot:body-cell-action="props">
          <q-td key="action" :props="props">
            <q-btn
              size="sm"
              color="positive"
              label="Edit" @click="openBankAccountDialog(props.row.id)"/>
          </q-td>
        </template>
      </q-table>
    </q-responsive>

    <teleport to="#dialog-container">
      <q-dialog v-model="dialog"
        persistent
        transition-show="fade"
        transition-hide="fade">
        <BankAccountDialog
          :bankAccountId="bankAccountId"
          @add-bankAccount="addBankAccount"
          @update-bankAccount="updateBankAccount"
        ></BankAccountDialog>
      </q-dialog>
    </teleport>
  </q-page>
</template>

<script>
import { api } from 'src/boot/axios'
import { ref, onMounted } from 'vue'
import BankAccountDialog from './BankAccountDialog.vue'

const columns = [
  {
    name: 'name',
    label: 'Name',
    align: 'left',
    field: 'name'
  },
  {
    name: 'account number',
    label: 'Account Number',
    align: 'left',
    field: 'account_number'
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
  name: 'BankAccount',
  components: {
    BankAccountDialog
  },
  setup () {
    const bankAccounts = ref([])
    onMounted(() => {
      api.get('/admin/settings/bank-accounts')
        .then(response => {
          bankAccounts.value = response.data.bankAccounts
        })
    })

    const addBankAccount = (payload) => {
      bankAccounts.value.unshift(payload)
    }

    const updateBankAccount = (payload) => {
      const targetIndex = bankAccounts.value.findIndex(x => x.id === payload.id)
      Object.assign(bankAccounts.value[targetIndex], payload)
    }

    const dialog = ref(false)
    const bankAccountId = ref(null)
    const openBankAccountDialog = (id) => {
      dialog.value = true
      bankAccountId.value = id
    }

    return {
      columns,
      rows,
      bankAccounts,
      dialog,
      openBankAccountDialog,
      bankAccountId,
      addBankAccount,
      updateBankAccount
    }
  }
}
</script>
