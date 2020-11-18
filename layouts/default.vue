<template>
  <v-app dark>
    <update-available-dialog v-if="update_available"></update-available-dialog>
    <sidebar />
    <v-main>
      <toolbar v-if="$vuetify.breakpoint.mdAndUp" />
      <nuxt />
    </v-main>
    <mobile-toolbar v-if="false"></mobile-toolbar>
    <app-footer v-if="false"></app-footer>
  </v-app>
</template>

<script>
import pkg from '@/package.json'

import Toolbar from '@/components/Toolbar'
import MobileToolbar from '@/components/MobileToolbar'
import AppFooter from '@/components/Footer'
import Sidebar from '@/components/Sidebar'
import UpdateAvailableDialog from '@/components/UpdateAvailableDialog'

export default {
  components: {
    Toolbar,
    MobileToolbar,
    AppFooter,
    Sidebar,
    UpdateAvailableDialog
  },

  data() {
    return {
      update_available: false
    }
  },

  async mounted() {
    this.$vuetify.theme.dark = this.$store.getters[`settings/dark_theme`]

    // navigator.serviceWorker.ready.then((registration) => {
    //   registration.update().then(() => {
    //     console.log('update console ------------------')
    //   })
    // })

    const workbox = await window.$workbox;
    if ( workbox ) {
      workbox.addEventListener( 'waiting', async (event) => {
        console.log('waiting-----------------', event );
        this.update_available = true
      });

      workbox.addEventListener('installed', (event) => {
        if (event.isUpdate) {
          console.log('----------- update available -----------')
          this.update_available = true
        }
      })
    }
  },
}
</script>

<style lang="sass">
.theme--light
  &.v-application
    background: #F4F4F4
</style>
