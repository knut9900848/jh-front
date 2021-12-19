<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          IES Management System
        </q-toolbar-title>

        <div v-if="user.name">
          <q-btn-dropdown color="primary" flat :label="userBtnName" text-color="white">
            <q-list>
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label>Setting</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="logout()">
                <q-item-section>
                  <q-item-label>Log out</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
        <div v-else>
          <q-btn color="primary" flat text-color="white" :to="{ name: 'login' }">Login</q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      bordered
      class="bg-grey-1"
    >
      <q-list bordered padding class="rounded-borders text-primary">
        <q-item
          clickable
          v-ripple
          :active="link === '/'"
          @click="link = '/'"
          active-class="my-menu-link"
          :to="{ name: 'home' }" exact
        >
          <q-item-section avatar>
            <q-icon name="inbox" />
          </q-item-section>

          <q-item-section>Home</q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          :active="link === 'members'"
          @click="link = 'members'"
          active-class="my-menu-link"
          :to="{ name: 'admin-members-index' }"
        >
          <q-item-section avatar>
            <q-icon name="send" />
          </q-item-section>

          <q-item-section>Members</q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          :active="link === 'trash'"
          @click="link = 'trash'"
          active-class="my-menu-link"
        >
          <q-item-section avatar>
            <q-icon name="delete" />
          </q-item-section>

          <q-item-section>Trash</q-item-section>
        </q-item>

        <q-separator spaced />

        <q-item
          clickable
          v-ripple
          :active="link === 'settings'"
          @click="link = 'settings'"
          active-class="my-menu-link"
          :to="{ name: 'admin-settings-branch' }"
        >
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>

          <q-item-section>Settings</q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          :active="link === 'help'"
          @click="link = 'help'"
          active-class="my-menu-link"
        >
          <q-item-section avatar>
            <q-icon name="help" />
          </q-item-section>

          <q-item-section>Help</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'MainLayout',

  components: {},

  setup () {
    const leftDrawerOpen = ref(false)
    const store = useStore()
    const user = computed(() => store.state.auth.user)
    const userBtnName = ref(user.value.name)
    const logout = () => store.dispatch('auth/LOG_OUT')
    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      user,
      link: ref('/'),
      userBtnName,
      logout
    }
  }
})
</script>

<style lang="sass">
.my-menu-link
  color: white
  background: #F2C037
</style>
