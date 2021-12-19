<template>
  <q-page class="q-pa-md">
    <q-responsive :ratio="16/9">
      <q-table
        title="Terms And Conditions"
        :rows="termsAndConditionses"
        :columns="columns"
        row-key="id"
        flat
        separator="cell"
        bordered
        table-header-class="text-white bg-blue"
      >
        <template v-slot:top>
          <div class="col-4 q-table__title">Terms And Conditions</div>

          <q-space />

          <q-btn flat label="Add Terms and Condtions" @click="openTermsAndConditionsDialog (0)"></q-btn>
        </template>

        <template v-slot:body-cell-download="props">
          <q-td key="download" :props="props">
            <q-btn
              size="sm"
              color="positive"
              label="Download" @click="downloadFile(props.row)" />
          </q-td>
        </template>

        <template v-slot:body-cell-action="props">
          <q-td key="action" :props="props">
            <q-btn
              size="sm"
              color="positive"
              label="Edit" @click="openTermsAndConditionsDialog(props.row.id)"/>
          </q-td>
        </template>
      </q-table>
    </q-responsive>

    <teleport to="#dialog-container">
      <q-dialog v-model="dialog"
        persistent
        transition-show="fade"
        transition-hide="fade">
        <TermsAndConditionsDialog
          :termsAndConditionsId="termsAndConditionsId"
          @add-termsAndConditions="addTermsAndConditions"
          @update-termsAndConditions="updateTermsAndConditions"
        ></TermsAndConditionsDialog>
      </q-dialog>
    </teleport>
  </q-page>
</template>

<script>
import { api } from 'src/boot/axios'
import { ref, onMounted } from 'vue'
import TermsAndConditionsDialog from './TermsAndConditionsDialog.vue'

const columns = [
  {
    name: 'id',
    label: 'ID',
    align: 'left',
    field: 'id'
  },
  {
    name: 'name',
    label: 'Name',
    align: 'left',
    field: 'name'
  },
  {
    name: 'fileName',
    label: 'File Name',
    align: 'left',
    field: 'file_origin_name'
  },
  {
    name: 'download',
    label: 'Download',
    align: 'left',
    field: 'download'
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
  name: 'TermsAndConditions',
  components: {
    TermsAndConditionsDialog
  },
  setup () {
    const termsAndConditionses = ref([])
    onMounted(() => {
      api.get('/admin/settings/terms-and-conditions')
        .then(response => {
          termsAndConditionses.value = response.data.termsAndConditionses
        })
    })

    const addTermsAndConditions = (payload) => {
      termsAndConditionses.value.unshift(payload)
    }

    const updateTermsAndConditions = (payload) => {
      const targetIndex = termsAndConditionses.value.findIndex(x => x.id === payload.id)
      Object.assign(termsAndConditionses.value[targetIndex], payload)
    }

    const dialog = ref(false)
    const termsAndConditionsId = ref(null)
    const openTermsAndConditionsDialog = (id) => {
      dialog.value = true
      termsAndConditionsId.value = id
    }

    const downloadFile = (file) => {
      api.get(`/admin/settings/terms-and-conditions/${file.id}/download`, { responseType: 'arraybuffer' })
        .then(response => {
          console.log(response.headers.filename)
          const url = window.URL.createObjectURL(new Blob([response.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', file.file_origin_name + '.' + file.extension)
          document.body.appendChild(link)
          link.click()
        })
    }

    return {
      columns,
      rows,
      termsAndConditionses,
      dialog,
      openTermsAndConditionsDialog,
      termsAndConditionsId,
      addTermsAndConditions,
      updateTermsAndConditions,
      downloadFile
    }
  }
}
</script>
