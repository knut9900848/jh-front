<template>
  <q-page class="q-pa-md">
    <q-responsive :ratio="16/9">
      <q-table
        title="Branch"
        :rows="branches"
        :columns="columns"
        row-key="name"
        flat
        separator="cell"
        bordered
        table-header-class="text-white bg-blue"
      >
        <template v-slot:top>
          <div class="col-2 q-table__title">Branch</div>

          <q-space />

          <q-btn flat label="Add Branch" @click="openBranchdialog (0)"></q-btn>
        </template>

        <template v-slot:body-cell-action="props">
          <q-td key="action" :props="props">
            <q-btn
              size="sm"
              color="positive"
              label="Edit" @click="openBranchdialog(props.row.id)"/>
          </q-td>
        </template>
      </q-table>
    </q-responsive>

    <teleport to="#dialog-container">
      <q-dialog v-model="dialog"
        persistent
        transition-show="fade"
        transition-hide="fade">
        <BranchDialog
          name="Steve Yoo"
          email="knut9900848@gmail.com"
          :branchId="branchId"
          @add-branch="addBranch"
          @update-branch="updateBranch"
        ></BranchDialog>
      </q-dialog>
    </teleport>
  </q-page>
</template>

<script>
import { api } from 'src/boot/axios'
import { ref, onMounted } from 'vue'
import BranchDialog from './BranchDialog.vue'

const columns = [
  {
    name: 'name',
    label: 'Name',
    align: 'left',
    field: 'name'
  },
  {
    name: 'code',
    label: 'Code',
    align: 'left',
    field: 'code'
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
  name: 'Branch',
  components: {
    BranchDialog
  },
  setup () {
    const branches = ref([])
    onMounted(() => {
      api.get('/admin/settings/branches')
        .then(response => {
          branches.value = response.data.branches
        })
    })

    const addBranch = (payload) => {
      branches.value.unshift(payload)
    }

    const updateBranch = (payload) => {
      const targetIndex = branches.value.findIndex(x => x.id === payload.id)
      Object.assign(branches.value[targetIndex], payload)
    }

    const dialog = ref(false)
    const branchId = ref(null)
    const openBranchdialog = (id) => {
      dialog.value = true
      branchId.value = id
    }

    return {
      columns,
      rows,
      branches,
      dialog,
      openBranchdialog,
      branchId,
      addBranch,
      updateBranch
    }
  }
}
</script>
