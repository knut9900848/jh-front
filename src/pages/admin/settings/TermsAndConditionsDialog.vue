<template>
  <q-card>
    <q-toolbar class="bg-blue">
      <q-toolbar-title>
        Terms And Conditions
      </q-toolbar-title>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-toolbar>

    <TheAlert :errors="errors"/>

    <q-form class="q-gutter-md">
      <q-card-section class="q-pa-md">
        <div class="row">
          <div class="col-12 q-pa">
            <q-input
              class="q-pa-sm"
              dense
              outlined
              label="Terms And Conditions Name"
              v-model="termsAndConditions.name" />
          </div>
          <div class="col-12 q-pa">
            <q-file
              dense
              outlined
              class="q-pa-sm"
              v-model="selectedFile"
              label="Upload File"
              @change="selectFile" />
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
              v-model="termsAndConditions.description" />
          </div>
        </div>

        <q-separator />

        <div class="row">
          <div class="col">
            <q-toggle
              label="Activation"
              v-model="termsAndConditions.is_active" />
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
import axios from 'axios'
import { useQuasar } from 'quasar'
import TheAlert from 'src/components/global/TheAlert.vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, email } from '@vuelidate/validators'

export default {
  name: 'TermsAndConditionsDialog',
  components: {
    TheAlert
  },
  props: {
    termsAndConditionsId: Number
  },

  setup (props, { emit }) {
    const $q = useQuasar()
    const errors = ref([])
    const termsAndConditions = reactive({
      id: '',
      name: '',
      file_name: '',
      file_origin_name: '',
      extension: '',
      mime_type: '',
      description: '',
      is_active: false
    })
    let selectedFile = ref([])

    const rules = {
      name: { required, minLength: minLength(6), email },
      kor_name: { required, email },
      code: { required }
    }

    const v$ = useVuelidate(rules, termsAndConditions)

    if (props.termsAndConditionsId !== 0) {
      onMounted(() => {
        api.get('/admin/settings/terms-and-conditions/' + props.termsAndConditionsId)
          .then(response => {
            Object.assign(termsAndConditions, response.data.termsAndConditions)
          })
      })
    }

    const createTermsAndConditions = () => {
      $q.loading.show()

      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('id', termsAndConditions.id)
      formData.append('name', termsAndConditions.name)
      formData.append('is_active', termsAndConditions.is_active)
      formData.append('description', termsAndConditions.description)

      api.post('/admin/settings/terms-and-conditions', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
        .then(response => {
          termsAndConditions.value = response.data.termsAndConditions
          emit('add-termsAndConditions', response.data.termsAndConditions)
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

    const updateTermsAndConditions = () => {
      console.log('update')
      $q.loading.show()

      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('id', termsAndConditions.id)
      formData.append('name', termsAndConditions.name)
      formData.append('is_active', termsAndConditions.is_active)
      formData.append('description', termsAndConditions.description)
      formData.append('_method', 'PUT')

      for (const value of formData.values()) {
        console.log('formData', value)
      }

      axios.post(`http://localhost/api/admin/settings/terms-and-conditions/${props.termsAndConditionsId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        _method: 'PUT'
      })
        .then(response => {
          console.log(response.data)
          // termsAndConditions.value = response.data.termsAndConditions
          // emit('update-termsAndConditions', response.data.termsAndConditions)
          // $q.notify({
          //   message: response.data.message,
          //   actions: [
          //     { label: 'Dismiss', color: 'white' }
          //   ]
          // })
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

    const save = () => props.termsAndConditionsId === 0
      ? createTermsAndConditions()
      : updateTermsAndConditions()

    const selectFile = (event) => {
      selectedFile = event.target.files[0]
    }

    return {
      termsAndConditions,
      save,
      errors,
      v$,
      selectedFile,
      selectFile
    }
  }
}
</script>
