<template>
  <v-bottom-navigation app grow>
    <v-btn to="/blocks" nuxt-link>
      <span>Blocks</span>
      <v-icon>mdi-cube</v-icon>
    </v-btn>

    <v-btn to="/transactions" nuxt-link>
      <span>Transactions</span>
      <v-icon>mdi-bank-transfer</v-icon>
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
