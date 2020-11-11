<template>
  <v-toolbar flat>
    <v-spacer />
    <user-menu v-if="address" />
  </v-toolbar>
</template>

<script>
import UserMenu from '@/components/UserMenu'

export default {
  components: {
    UserMenu
  },
  computed: {
    address() {
      return this.$store.getters[`wallet/address`]
    }
  }
}
</script>

<style lang="sass">
.theme--dark.v-toolbar.v-sheet
  background-color: #121212
</style>
