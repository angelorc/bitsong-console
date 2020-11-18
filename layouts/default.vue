<template>
  <v-app dark>
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

export default {
  components: {
    Toolbar,
    MobileToolbar,
    AppFooter,
    Sidebar
  },
  async mounted() {
    this.$vuetify.theme.dark = this.$store.getters[`settings/dark_theme`]

    // navigator.serviceWorker.ready.then((registration) => {
    //   registration.update().then(() => {
    //     console.log('update console ------------------')
    //   })
    // })

    // console.log('pkg_version', pkg.version)
    // console.log('store_version', this.$store.getters['settings/version'])
    // console.log('wallet', this.$store.getters['wallet/address'])

    const workbox = await window.$workbox;
    console.log('workbox', workbox)
    if ( workbox ) {
      workbox.addEventListener( 'waiting', async (event) => {
        console.log('waiting-----------------', event );
        //await this.newVersionAvailable({ version: 'SW' });
      });

      workbox.addEventListener('installed', (event) => {
        if (event.isUpdate) {
          console.log('----------- update available -----------')
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
