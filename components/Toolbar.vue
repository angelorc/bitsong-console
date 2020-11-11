<template>
  <v-app-bar clipped-left app color="red darken-1" fixed dark>
    <v-row class="px-4">
      <v-toolbar-title class="pl-1">
        <router-link
          to="/"
          aria-label="BitSong"
          class="d-flex align-center"
          title="BitSong"
        >
          <img
            alt="BitSong"
            min-width="135"
            width="135"
            src="/bitsong_logo.svg"
          />
        </router-link>
      </v-toolbar-title>
    </v-row>
    <v-spacer />

    <v-btn
      v-if="$vuetify.breakpoint.mdAndUp && !address"
      active-class="no-active"
      class="mr-2"
      text
      to="/wallet/create"
      >Create Wallet</v-btn
    >
    <v-btn
      v-if="$vuetify.breakpoint.mdAndUp && !address"
      active-class="no-active"
      color="black"
      dark
      to="/wallet/import"
      >Sign In</v-btn
    >
    <v-btn
      v-if="$vuetify.breakpoint.smAndDown && !address"
      icon
      to="/wallet/import"
    >
      <v-icon size="28">mdi-account-circle</v-icon>
    </v-btn>
    <user-menu v-if="address" />
  </v-app-bar>
</template>

<script>
export default {
  computed: {
    address() {
      return `bitsong1pdfr7xuckj6lhdphdde6peres9ufwgpsxge8yc`
    }
  }
}
</script>
