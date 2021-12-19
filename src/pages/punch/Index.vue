<template>
  <q-page class="bg-grey-1 q-pa-md">
    <q-table
      title="Members"
      :rows="rows"
      :columns="columns"
      row-key="id"
      separator="cell"
      table-header-class="text-white bg-blue"
      flat
      virtual-scroll
    >
      <template v-slot:top>
        <q-input borderless dense debounce="300" color="primary">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-space />
        <q-btn class="q-ml-sm"
          color="primary"
          label="Add Punch"
          :to="{ name: 'admin-members-create', params: { mode: 'create' }}"
        />
      </template>
      <template v-slot:body-cell-status="props">
        <q-td key="status" :props="props">
          <q-chip color="red" text-color="white"
            v-if="props.row.status === 'CLOSED'"
          >{{props.row.status}}</q-chip>
          <q-chip
            v-else
          >{{props.row.status}}</q-chip>
        </q-td>
      </template>
      <template v-slot:body-cell-type="props">
        <q-td key="type" :props="props">
          <q-chip color="red" text-color="white"
            v-if="props.row.type === 'A'"
          >{{props.row.type}}</q-chip>
          <q-chip color="blue" text-color="white"
            v-else
          >{{props.row.type}}</q-chip>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

const columns = [
  {
    name: 'project',
    required: false,
    label: 'PROJECT',
    align: 'left',
    field: 'pjt_name'
  },

  {
    name: 'client',
    required: false,
    label: 'CLIENT',
    align: 'left',
    field: 'client'
  },

  {
    name: 'pkg',
    required: false,
    label: 'PKG',
    align: 'left',
    field: 'pkg'
  },

  {
    name: 'punch_no',
    required: false,
    label: 'Punch No.',
    align: 'left',
    field: 'punch_no'
  },

  {
    name: 'tag_no',
    required: false,
    label: 'Tag No.',
    align: 'left',
    field: 'tag_no'
  },

  {
    name: 'type',
    required: false,
    label: 'TYPE',
    align: 'center',
    field: 'type'
  },

  {
    name: 'status',
    required: false,
    label: 'STATUS',
    align: 'center',
    field: 'status'
  },

  {
    name: 'issued_at',
    required: false,
    label: 'ISSUED AT',
    align: 'left',
    field: 'issued_at'
  },

  {
    name: 'cleared_at',
    required: false,
    label: 'CLEARED AT',
    align: 'left',
    field: 'cleared_at'
  }
]

const rows = [
  {
    pjt_name: 'Ruby FPSO',
    client: 'Emerson',
    pkg: 'Metering Skid 1st',
    punch_no: 'IN002-R-328',
    tag_no: 'N/A',
    type: 'B',
    status: 'CLOSED',
    issued_at: '2021-09-21',
    cleared_at: '2021-10-01'
  },
  {
    pjt_name: 'Ruby FPSO',
    client: 'Emerson',
    pkg: 'Metering Skid 1st',
    punch_no: 'IN002-R-234',
    tag_no: 'N/A',
    type: 'A',
    status: 'HOLDING',
    issued_at: '2021-09-21',
    cleared_at: ''
  },
  {
    pjt_name: 'Ruby FPSO',
    client: 'Emerson',
    pkg: 'Metering Skid 1st',
    punch_no: 'IN002-R-352',
    tag_no: 'N/A',
    type: 'A',
    status: 'CLOSED',
    issued_at: '2021-09-21',
    cleared_at: '2021-10-03'
  },
  {
    pjt_name: 'Ruby FPSO',
    client: 'Emerson',
    pkg: 'Metering Skid 1st',
    punch_no: 'IN002-R-567',
    tag_no: 'N/A',
    type: 'B',
    status: 'OPEN',
    issued_at: '2021-09-21',
    cleared_at: '2021-09-30'
  },
  {
    pjt_name: 'Ruby FPSO',
    client: 'Emerson',
    pkg: 'Metering Skid 1st',
    punch_no: 'IN002-R-455',
    tag_no: 'N/A',
    type: 'B',
    status: 'OPEN',
    issued_at: '2021-09-21',
    cleared_at: ''
  },
  {
    pjt_name: 'Ruby FPSO',
    client: 'Emerson',
    pkg: 'Metering Skid 1st',
    punch_no: 'IN002-R-346',
    tag_no: 'N/A',
    type: 'B',
    status: 'OPEN',
    issued_at: '2021-09-21',
    cleared_at: ''
  },
  {
    pjt_name: 'Ruby FPSO',
    client: 'Emerson',
    pkg: 'Metering Skid 1st',
    punch_no: 'IN002-R-844',
    tag_no: 'N/A',
    type: 'A',
    status: 'CLOSED',
    issued_at: '2021-09-21',
    cleared_at: '2021-09-22'
  },
  {
    pjt_name: 'Ruby FPSO',
    client: 'Emerson',
    pkg: 'Metering Skid 1st',
    punch_no: 'IN002-R-857',
    tag_no: 'N/A',
    type: 'A',
    status: 'OPEN',
    issued_at: '2021-09-29',
    cleared_at: ''
  },
  {
    pjt_name: 'Ruby FPSO',
    client: 'Emerson',
    pkg: 'Metering Skid 1st',
    punch_no: 'IN002-R-348',
    tag_no: 'N/A',
    type: 'B',
    status: 'OPEN',
    issued_at: '2021-09-25',
    cleared_at: ''
  },
  {
    pjt_name: 'Ruby FPSO',
    client: 'Emerson',
    pkg: 'Metering Skid 1st',
    punch_no: 'IN002-R-190',
    tag_no: 'N/A',
    type: 'A',
    status: 'CLOSED',
    issued_at: '2021-09-21',
    cleared_at: '2021-09-22'
  },
  {
    pjt_name: 'Ruby FPSO',
    client: 'Emerson',
    pkg: 'Metering Skid 1st',
    punch_no: 'IN002-R-287',
    tag_no: 'N/A',
    type: 'A',
    status: 'CLOSED',
    issued_at: '2021-09-21',
    cleared_at: '2021-10-17'
  },
  {
    pjt_name: 'Ruby FPSO',
    client: 'Emerson',
    pkg: 'Metering Skid 1st',
    punch_no: 'IN002-R-745',
    tag_no: 'N/A',
    type: 'A',
    status: 'OPEN',
    issued_at: '2021-09-21',
    cleared_at: ''
  },
  {
    pjt_name: 'Ruby FPSO',
    client: 'Emerson',
    pkg: 'Metering Skid 1st',
    punch_no: 'IN002-R-567',
    tag_no: 'N/A',
    type: 'A',
    status: 'OPEN',
    issued_at: '2021-09-21',
    cleared_at: ''
  },
  {
    pjt_name: 'Ruby FPSO',
    client: 'Emerson',
    pkg: 'Metering Skid 1st',
    punch_no: 'IN002-R-001',
    tag_no: 'N/A',
    type: 'A',
    status: 'OPEN',
    issued_at: '2021-09-21',
    cleared_at: ''
  },
  {
    pjt_name: 'Ruby FPSO',
    client: 'Emerson',
    pkg: 'Metering Skid 1st',
    punch_no: 'IN002-R-564',
    tag_no: 'N/A',
    type: 'A',
    status: 'OPEN',
    issued_at: '2021-09-21',
    cleared_at: ''
  },
  {
    pjt_name: 'Ruby FPSO',
    client: 'Emerson',
    pkg: 'Metering Skid 1st',
    punch_no: 'IN002-R-232',
    tag_no: 'N/A',
    type: 'A',
    status: 'OPEN',
    issued_at: '2021-09-21',
    cleared_at: ''
  },
  {
    pjt_name: 'Ruby FPSO',
    client: 'Emerson',
    pkg: 'Metering Skid 1st',
    punch_no: 'IN002-R-352',
    tag_no: 'N/A',
    type: 'A',
    status: 'OPEN',
    issued_at: '2021-09-21',
    cleared_at: ''
  },
  {
    pjt_name: 'Ruby FPSO',
    client: 'Emerson',
    pkg: 'Metering Skid 1st',
    punch_no: 'IN002-R-352',
    tag_no: 'N/A',
    type: 'A',
    status: 'OPEN',
    issued_at: '2021-09-21',
    cleared_at: ''
  },
  {
    pjt_name: 'Ruby FPSO',
    client: 'Emerson',
    pkg: 'Metering Skid 1st',
    punch_no: 'IN002-R-352',
    tag_no: 'N/A',
    type: 'A',
    status: 'OPEN',
    issued_at: '2021-09-21',
    cleared_at: ''
  },
  {
    pjt_name: 'Ruby FPSO',
    client: 'Emerson',
    pkg: 'Metering Skid 1st',
    punch_no: 'IN002-R-352',
    tag_no: 'N/A',
    type: 'A',
    status: 'OPEN',
    issued_at: '2021-09-21',
    cleared_at: ''
  },
  {
    pjt_name: 'Ruby FPSO',
    client: 'Emerson',
    pkg: 'Metering Skid 1st',
    punch_no: 'IN002-R-352',
    tag_no: 'N/A',
    type: 'A',
    status: 'OPEN',
    issued_at: '2021-09-21',
    cleared_at: ''
  },
  {
    pjt_name: 'Ruby FPSO',
    client: 'Emerson',
    pkg: 'Metering Skid 1st',
    punch_no: 'IN002-R-352',
    tag_no: 'N/A',
    type: 'A',
    status: 'OPEN',
    issued_at: '2021-09-21',
    cleared_at: ''
  },
  {
    pjt_name: 'Ruby FPSO',
    client: 'Emerson',
    pkg: 'Metering Skid 1st',
    punch_no: 'IN002-R-352',
    tag_no: 'N/A',
    type: 'A',
    status: 'OPEN',
    issued_at: '2021-09-21',
    cleared_at: ''
  },
  {
    pjt_name: 'Ruby FPSO',
    client: 'Emerson',
    pkg: 'Metering Skid 1st',
    punch_no: 'IN002-R-352',
    tag_no: 'N/A',
    type: 'A',
    status: 'OPEN',
    issued_at: '2021-09-21',
    cleared_at: ''
  },
  {
    pjt_name: 'Ruby FPSO',
    client: 'Emerson',
    pkg: 'Metering Skid 1st',
    punch_no: 'IN002-R-352',
    tag_no: 'N/A',
    type: 'A',
    status: 'OPEN',
    issued_at: '2021-09-21',
    cleared_at: ''
  }
]

export default {

  setup () {
    const store = useStore()

    onMounted(() => {
      store.dispatch('members/GET_USERS')
    })

    const users = computed(() => store.state.members.users)
    console.log('users', users)

    const user = computed(() => store.state.auth.user)

    return {
      users, columns, user, rows
    }
  }
}
</script>

<style>
.header {
  background-color: #f00;
}
</style>
