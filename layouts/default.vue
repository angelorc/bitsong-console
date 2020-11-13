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
  }
}
</script>

<style lang="sass">
.theme--light
  &.v-application
    background: #F4F4F4
</style>
