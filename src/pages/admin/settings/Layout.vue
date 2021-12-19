<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col-md-2">
        <q-list bordered separator>
          <q-item clickable
            v-ripple
            :to="{ name: 'admin-settings-branch' }"
          >
            <q-item-section>Branch Information</q-item-section>
          </q-item>

          <q-item clickable
            :to="{ name: 'admin-settings-bank-account' }"
            v-ripple
          >
            <q-item-section>Bank Account</q-item-section>
          </q-item>

          <q-item clickable
            :to="{ name: 'admin-settings-currency' }"
            v-ripple
          >
            <q-item-section>Currency</q-item-section>
          </q-item>

          <q-item clickable
            :to="{ name: 'admin-settings-unit' }"
            v-ripple
          >
            <q-item-section>Unit</q-item-section>
          </q-item>

          <q-item clickable
            v-ripple
            :to="{ name: 'admin-settings-terms-and-conditions' }"
          >
            <q-item-section>PO Terms and Conditions</q-item-section>
          </q-item>

          <q-item clickable
            v-ripple
          >
            <q-item-section>Payment Methods</q-item-section>
          </q-item>
        </q-list>
      </div>
      <div class="col-md-10">
        <router-view />
      </div>
    </div>
  </div>

</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AdminSettingsLayout'
})
</script>
