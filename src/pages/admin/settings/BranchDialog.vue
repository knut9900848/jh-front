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
              label="Branch Name"
              v-model="branch.name" />
            <span v-if="v$.name.$error">
              {{ v$.name.$errors[0].$message }}
            </span>
          </div>
          <div class="col-4">
            <q-input
              class="q-pa-sm"
              dense
              outlined
              label="Korean Name"
              v-model="branch.kor_name" />
              <span>{{v$.kor_name.$error}}</span>
              <span>{{v$.kor_name.$errors[0]}}</span>
          </div>
          <div class="col-4">
            <q-input
              class="q-pa-sm"
              dense
              outlined
              label="Code"
              v-model="branch.code" />
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
              label="Street1"
              v-model="branch.street1" />
          </div>
          <div class="col-6">
            <q-input
              class="q-pa-sm"
              dense
              outlined
              label="Street2"
              v-model="branch.street2" />
          </div>
        </div>

        <div class="row">
          <div class="col-6">
            <q-input
              class="q-pa-sm"
              dense
              outlined
              label="City"
              v-model="branch.city" />
          </div>
          <div class="col-6">
            <q-input
              class="q-pa-sm"
              dense
              outlined
              label="State"
              v-model="branch.state" />
          </div>
          <div class="col-6">
            <q-input
              class="q-pa-sm"
              dense
              outlined
              label="Country"
              v-model="branch.country" />
          </div>
          <div class="col-6">
            <q-input
              class="q-pa-sm"
              dense
              outlined
              label="Zipcode"
              v-model="branch.zipcode"/>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <q-input
              class="q-pa-sm"
              dense
              outlined
              label="한글주소"
              v-model="branch.kor_address" />
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pa-md">
        <div class="row">
          <div class="col">
            <q-input
              class="q-pa-sm"
              dense
              outlined
              label="Resistration number"
              v-model="branch.reg_number" />
          </div>
          <div class="col">
            <q-input
              class="q-pa-sm"
              dense
              outlined
              label="V.A.T Registration Number"
              v-model="branch.vat_reg_number" />
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
              label="Email"
              v-model="branch.email"
              lazy-rules />
          </div>
          <div class="col-6">
            <q-input
              class="q-pa-sm"
              dense
              outlined
              label="Phone"
              v-model="branch.phone" />
          </div>
          <div class="col-6">
            <q-input
              class="q-pa-sm"
              dense
              outlined
              label="Fax"
              v-model="branch.fax" />
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
              v-model="branch.description" />
          </div>
        </div>

        <q-separator />

        <div class="row">
          <div class="col">
            <q-toggle
              label="Activation"
              v-model="branch.is_active"/>
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
  name: 'BranchDialog',
  components: {
    TheAlert
  },
  props: {
    branchId: Number
  },

  setup (props, { emit }) {
    const $q = useQuasar()
    const errors = ref([])
    const branch = reactive({
      id: '',
      name: '',
      kor_name: '',
      code: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      conutry: '',
      zipcode: '',
      kor_address: '',
      reg_number: '',
      vat_reg_number: '',
      phone: '',
      fax: '',
      email: '',
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

    const v$ = useVuelidate(rules, branch)

    if (props.branchId !== 0) {
      onMounted(() => {
        api.get('/admin/settings/branches/' + props.branchId)
          .then(response => {
            Object.assign(branch, response.data.branch)
          })
      })
    }

    const createBranch = () => {
      $q.loading.show()
      api.post('/admin/settings/branches', branch)
        .then(response => {
          console.log(response.data)
          branch.value = response.data.branch
          emit('add-branch', response.data.branch)
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

    const updateBranch = () => {
      $q.loading.show()
      api.put('/admin/settings/branches/' + props.branchId, branch)
        .then(response => {
          branch.value = response.data.branch
          emit('update-branch', response.data.branch)
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

    const save = () => props.branchId === 0
      ? createBranch()
      : updateBranch()

    return {
      branch,
      save,
      errors,
      v$
    }
  }
}
</script>
