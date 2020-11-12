<template>
  <v-app dark>
    <sidebar v-if="$vuetify.breakpoint.mdAndUp" />
    <v-main>
      <toolbar v-if="$vuetify.breakpoint.mdAndUp" />
      <nuxt />
    </v-main>
    <mobile-toolbar v-if="$vuetify.breakpoint.smAndDown"></mobile-toolbar>
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
    AppFooter,
  },
}
</script>

<style lang="sass">
h3
  font-family: 'Source Sans Pro', "Roboto", sans-serif !important

.v-application .title
  font-family: 'Source Sans Pro', "Roboto", sans-serif !important
  font-weight: 600

.v-application .text-h4
  font-family: 'Source Sans Pro', "Roboto", sans-serif !important
  font-weight: 600

.v-application .text-h5
  font-family: 'Source Sans Pro', "Roboto", sans-serif !important
  font-weight: 600

.v-application .text-h6
  font-family: 'Source Sans Pro', "Roboto", sans-serif !important
  font-weight: 600

.v-card__title
  font-family: 'Source Sans Pro', "Roboto", sans-serif !important
  font-weight: 600

.v-toolbar__title
  font-family: 'Source Sans Pro', "Roboto", sans-serif !important
  font-weight: 600

.source-sans
  font-family: 'Source Sans Pro', "Roboto", sans-serif !important
</style>
