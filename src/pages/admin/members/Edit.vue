<template>
<q-page class="bg-grey-1 q-pa-md">
  <div class="row">
    <div class="col-sm-9">
      <q-card class="full-width" square flat bordered>
        <q-toolbar class="bg-primary">
          <q-toolbar-title class="text-white text-h6">
            {{ title }}
          </q-toolbar-title>
          <q-space />
        </q-toolbar>
        Message: {{ validate.member.email.$message }}
        <br>
        <q-input v-model="test" />
        <q-card-section class="q-pa-md">
          <div class="row q-col-gutter-md">
            <div class="col-md-6">
              <q-input
                v-model="member.email"
                label="Email"
                type="email"
                dense
                filled
                outlined
                bordered
                error-message="What the hell" />
            </div>
            <div class="col-md-6">
              <q-input
                v-model="member.name"
                label="Name"
                dense
                filled
                outlined
                bordered />
            </div>
            <div class="col-md-6">
              <q-input
                v-model="member.kor_name"
                label="Korean Name"
                dense
                filled
                outlined
                bordered />
            </div>
            <div class="col-md-6">
              <q-select
                v-model="member.gender"
                label="Gender"
                dense
                filled
                outlined
                bordered
                :options="gender"
              ></q-select>
            </div>
            <div class="col-md-6">
              <q-input
                v-model="member.position"
                label="Position"
                dense
                filled
                outlined
                bordered />
            </div>
            <div class="col-md-6">
              <q-input
                v-model="member.kor_position"
                label="Position(Korean)"
                dense
                filled
                outlined
                bordered />
            </div>
            <div class="col-md-6">
              <q-input
                v-model="member.tel"
                label="Tel"
                dense
                filled
                outlined
                bordered />
            </div>
            <div class="col-md-6">
              <q-input
                v-model="member.mobile"
                label="Mobile"
                dense
                filled
                outlined
                bordered />
            </div>
            <div class="col-md-6">
              <q-input
                v-model="member.password"
                label="Passowrd"
                dense
                filled
                outlined
                bordered />
            </div>
            <div class="col-md-6">
              <q-input
                v-model="member.password_confirmation"
                label="Confirm Password"
                dense
                filled
                outlined
                bordered />
            </div>
            <div class="col-md-6">
              <q-input
                v-model="member.join_date"
                label="Join Date"
                dense
                filled
                outlined
                bordered />
            </div>
            <div class="col-md-6">
              <q-input
                v-model="member.resignation_date"
                label="Resignation Date"
                dense
                filled
                outlined
                bordered />
            </div>
            <div class="col">
              <q-toggle
                label="Activation"
                v-model="member.is_active"/>
            </div>
          </div>
        </q-card-section>

        <q-separator spaced />

        <q-card-actions align="right">
          <q-btn flat @click="createUser">Update</q-btn>
        </q-card-actions>
      </q-card>
    </div>
    <div class="col-sm-3">
      <div class="q-ml-md">
        <q-list bordered separator>
          <q-item clickable v-ripple>
            <q-item-section>Single line item</q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label>Item with caption</q-item-label>
              <q-item-label caption>Caption</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label overline>OVERLINE</q-item-label>
              <q-item-label>Item with caption</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </div>
</q-page>
</template>

<script>
import { reactive, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { api } from 'src/boot/axios'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, email } from '@vuelidate/validators'

export default {
  name: 'MemberEdit',

  setup (context) {
    const test = ref('')
    const member = reactive({
      name: '',
      kor_name: '',
      gender: '',
      email: '',
      position: '',
      kor_position: '',
      join_date: '',
      resignation_date: '',
      password: '',
      password_confirmation: '',
      is_active: false
    })

    // const rules = computed(() => ({
    //   email: { required, email }
    // }))

    // const rules = computed(() => ({
    //   test: { required, email, minLength: minLength(15) }
    // }))

    // const rules = computed(() => ({
    //   email: { required, email, minLength: minLength(15) }
    // }))

    const rules = computed(() => ({
      member: {
        email: { required, email, minLength: minLength(15) }
      }
    }))

    // const validate = useVuelidate(rules, { email, name })
    // const validate = useVuelidate(rules, { test })
    const validate = useVuelidate(rules, member)

    const gender = ref([
      'Male', 'Female'
    ])

    const route = useRoute()
    const title = route.params.mode === 'edit' ? 'Edit Member' : 'Create Member'

    const createUser = () => {
      api.post('/admin/members', member)
        .then(response => {
          console.log(response.data)
          route.push({ name: 'admin-members-edit', params: { id: member.id, mode: 'edit' } })
          // member.value = response.data.member
        })
    }

    const updateUser = () => {
      api.put('/admin/members' + route.params.id, member)
        .then(response => {
          member.value = response.data.member
        })
    }

    return {
      member,
      gender,
      title,
      createUser,
      updateUser,
      validate,
      test
    }
  }
}
</script>
