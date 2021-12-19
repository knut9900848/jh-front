<template>
  <q-card>
    <q-toolbar class="bg-blue">
      <q-toolbar-title>
        unit
      </q-toolbar-title>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-toolbar>

    <TheAlert :errors="errors"/>

    <q-form class="q-gutter-md">
      <q-card-section class="q-pa-md">
        <div class="row">
          <div class="col q-pa">
            <q-input
              class="q-pa-sm"
              dense
              outlined
              label="Unit Name"
              v-model="unit.name" />
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
              v-model="unit.description" />
          </div>
        </div>

        <q-separator />

        <div class="row">
          <div class="col">
            <q-toggle
              label="Activation"
              v-model="unit.is_active"/>
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
  name: 'UnitDialog',
  components: {
    TheAlert
  },
  props: {
    unitId: Number
  },

  setup (props, { emit }) {
    const $q = useQuasar()
    const errors = ref([])
    const unit = reactive({
      id: '',
      name: '',
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

    const v$ = useVuelidate(rules, unit)

    if (props.unitId !== 0) {
      onMounted(() => {
        api.get('/admin/settings/units/' + props.unitId)
          .then(response => {
            Object.assign(unit, response.data.unit)
          })
      })
    }

    const createUnit = () => {
      $q.loading.show()
      api.post('/admin/settings/units', unit)
        .then(response => {
          unit.value = response.data.unit
          emit('add-unit', response.data.unit)
          $q.notify({
            message: response.data.message,
            color: 'primary',
            actions: [
              { label: 'Dismiss', color: 'white' }
            ]
          })
        })
        .catch(error => {
          console.log('ERROR', error.response.data.errors)
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

    const updateUnit = () => {
      $q.loading.show()
      api.put('/admin/settings/units/' + props.unitId, unit)
        .then(response => {
          unit.value = response.data.unit
          emit('update-unit', response.data.unit)
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

    const save = () => props.unitId === 0
      ? createUnit()
      : updateUnit()

    return {
      unit,
      save,
      errors,
      v$
    }
  }
}
</script>
