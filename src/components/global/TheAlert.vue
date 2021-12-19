<template>
  <div v-if="errors">
    <div v-for="(error, index) in errors" :key="index">
      <div v-for="(message, index) in error" :key="index">
        <q-banner dense inline-actions class="text-white bg-red q-ma-md">
          {{ message }}
          <template v-slot:action>
            <q-btn icon="close" flat round dense />
          </template>
        </q-banner>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    errors: Object
  }
}
</script>
