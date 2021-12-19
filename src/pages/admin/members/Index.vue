<template>
  <q-page class="bg-grey-1 q-pa-md">
    <q-table
      title="Members"
      :rows="users"
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
          label="Add Member"
          :to="{ name: 'admin-members-create', params: { mode: 'create' }}"
        />
      </template>
      <template v-slot:body-cell-action="props">
          <q-td key="action" :props="props">
              <q-btn
                size="sm"
                color="positive"
                label="Edit"
                :to="{ name: 'admin-members-edit', params: { id: props.row.id, mode: 'edit' } }"
              />
              {{props.row.id}}
          </q-td>
        </template>
        <template v-slot:body-cell-role="props">
          <q-td key="role" :props="props">
              <q-btn
                size="sm"
                label="Set Roles"
                style="background: #FF0080;color: white"/>
          </q-td>
        </template>
        <template v-slot:body-cell-permission="props">
          <q-td key="permission" :props="props">
              <q-btn size="sm"
                label="Set Permissions"
                style="background: #FF0080; color: white"/>
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
    name: 'id',
    required: true,
    label: 'ID',
    align: 'left',
    field: 'id'
  },

  {
    name: 'email',
    required: true,
    label: 'Email',
    align: 'left',
    field: 'email'
  },

  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: 'name'
  },

  {
    name: 'position',
    required: false,
    label: 'Position',
    align: 'left',
    field: 'position'
  },

  {
    name: 'role',
    required: false,
    label: 'Role',
    align: 'left'
  },

  {
    name: 'permission',
    required: false,
    label: 'Permission',
    align: 'left'
  },

  {
    name: 'action',
    required: false,
    label: 'Action',
    align: 'left',
    field: 'action'
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
      users, columns, user
    }
  }
}
</script>

<style>
.header {
  background-color: #f00;
}
</style>
