<template>
  <v-bottom-navigation app grow>
    <v-btn to="/" nuxt-link>
      <span>Home</span>
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn to="/bank" nuxt-link>
      <span>Bank</span>
      <v-icon>mdi-bank</v-icon>
    </v-btn>

    <v-btn to="/staking" nuxt-link>
      <span>Staking</span>
      <v-icon>mdi-server-network</v-icon>
    </v-btn>

    <v-btn>
      <span>Governance</span>
      <v-icon>mdi-vote</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
