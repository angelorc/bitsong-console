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
    const workbox = await window.$workbox
    if (workbox) {
      workbox.addEventListener('installed', event => {
        console.log(event)
        if (event.isUpdate) {
          console.log('update----------')
        }
      })
    }
  },
  created() {
    this.$vuetify.theme.dark = this.$store.getters[`settings/dark_theme`]
  }
}
</script>

<style lang="sass">
.theme--light
  &.v-application
    background: #F4F4F4
</style>
