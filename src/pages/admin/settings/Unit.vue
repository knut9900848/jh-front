<template>
  <q-page class="q-pa-md">
    <q-responsive :ratio="16/9">
      <q-table
        title="units"
        :rows="units"
        :columns="columns"
        row-key="name"
        flat
        separator="cell"
        bordered
        table-header-class="text-white bg-blue"
      >
        <template v-slot:top>
          <div class="col-2 q-table__title">Unit</div>

          <q-space />

          <q-btn flat label="Add unit" @click="openUnitDialog (0)"></q-btn>
        </template>

        <template v-slot:body-cell-action="props">
          <q-td key="action" :props="props">
            <q-btn
              size="sm"
              color="positive"
              label="Edit" @click="openUnitDialog(props.row.id)"/>
          </q-td>
        </template>
      </q-table>
    </q-responsive>

    <teleport to="#dialog-container">
      <q-dialog v-model="dialog"
        persistent
        transition-show="fade"
        transition-hide="fade">
        <UnitDialog
          :unitId="unitId"
          @add-unit="addUnit"
          @update-unit="updateUnit"
        ></UnitDialog>
      </q-dialog>
    </teleport>
  </q-page>
</template>

<script>
import { api } from 'src/boot/axios'
import { ref, onMounted } from 'vue'
import UnitDialog from './UnitDialog.vue'

const columns = [
  {
    name: 'name',
    label: 'Name',
    align: 'left',
    field: 'name'
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
  name: 'Unit',
  components: {
    UnitDialog
  },
  setup () {
    const units = ref([])
    onMounted(() => {
      api.get('/admin/settings/units')
        .then(response => {
          units.value = response.data.units
        })
    })

    const addUnit = (payload) => {
      units.value.unshift(payload)
    }

    const updateUnit = (payload) => {
      const targetIndex = units.value.findIndex(x => x.id === payload.id)
      Object.assign(units.value[targetIndex], payload)
    }

    const dialog = ref(false)
    const unitId = ref(null)
    const openUnitDialog = (id) => {
      dialog.value = true
      unitId.value = id
    }

    return {
      columns,
      rows,
      units,
      dialog,
      openUnitDialog,
      unitId,
      addUnit,
      updateUnit
    }
  }
}
</script>
