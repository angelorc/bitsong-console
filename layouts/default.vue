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

export default {
  components: {
    Toolbar,
    MobileToolbar,
    AppFooter
  },
  async mounted() {
    const workbox = await window.$workbox;
    if (workbox) {
      workbox.addEventListener('installed', (event) => {
        console.log(event)
        if (event.isUpdate) {
          console.log('update----------')
        }
      });
    }
  }
}
</script>

<style lang="sass">
.theme--light
  &.v-application
    background: #F4F4F4
</style>
