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

    if (this.$store.getters['settings/version'] === '0.0.0') {
      this.$store.commit('settings/SET_VERSION', pkg.version)
    }

    console.log('store_version', this.$store.getters['settings/version'])

    // const workbox = await window.$workbox;
    // console.log('workbox', workbox)
    // if ( workbox ) {
    //   workbox.addEventListener( 'waiting', async (event) => {
    //     console.log('waiting-----------------', event );
    //     //await this.newVersionAvailable({ version: 'SW' });
    //   });
    // }

    // const workbox = await window.$workbox
    // if (workbox) {
    //   workbox.addEventListener('installed', (event) => {
    //     // this.$store.commit('checkInstallAvailable', false)
    //     workbox.addEventListener('statechange', () => {
    //       // Has network.state changed?
    //       if (workbox.state) {
    //         console.log('update')
    //       }
    //     })
    //     // If we don't do this we'll be displaying the notification after the initial installation, which isn't perferred.
    //     if (event.isUpdate) {
    //       console.log('----------- update available -----------')
    //       // this.newUpdateAvailable()
    //       // whatever logic you want to use to notify the user that they need to refresh the page.
    //       // this.$store.commit('checkUpdateAvailable', true)
    //     }
    //   })
    // }
  },
}
</script>

<style lang="sass">
.theme--light
  &.v-application
    background: #F4F4F4
</style>
