<template>
  <page-template>
    <v-app-bar
      app
      color="red darken-1"
      dark
      fixed
      v-if="$vuetify.breakpoint.smAndDown"
    >
      <v-toolbar-title class="text-h5"> {{ title }} </v-toolbar-title>
    </v-app-bar>
    <h1 v-else class="mb-8">{{ title }}</h1>
    <v-card class="mb-12">
      <v-card-title>Withdraw rewards</v-card-title>
      <v-card-subtitle>Withdraw rewards from a given delegation address, and optionally withdraw validator commission if the delegation address given is a validator operator.</v-card-subtitle>
      <v-divider></v-divider>
      <v-container>
        <v-row>
          <v-col cols="6">
            <v-text-field label="Address"></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field label="Coin"></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field label="Amount"></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-btn text small>Advanced Mode</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary">Send</v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="mb-12">
      <v-card-title>Set withdraw address</v-card-title>
      <v-card-subtitle>Change the default withdraw address for rewards associated with an address.</v-card-subtitle>
      <v-divider></v-divider>
      <v-container>
        <v-row>
          <v-col cols="6">
            <v-text-field label="Address"></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field label="Coin"></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field label="Amount"></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-btn text small>Advanced Mode</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary">Send</v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="mb-12">
      <v-card-title>Withdraw all rewards</v-card-title>
      <v-card-subtitle>Withdraw all delegations rewards for a delegator.</v-card-subtitle>
      <v-divider></v-divider>
      <v-container>
        <v-row>
          <v-col cols="6">
            <v-text-field label="Address"></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field label="Coin"></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field label="Amount"></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-btn text small>Advanced Mode</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary">Send</v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="mb-12">
      <v-card-title>Fund community pool</v-card-title>
      <v-card-subtitle>Funds the community pool with the specified amount.</v-card-subtitle>
      <v-divider></v-divider>
      <v-container>
        <v-row>
          <v-col cols="6">
            <v-text-field label="Address"></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field label="Coin"></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field label="Amount"></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-btn text small>Advanced Mode</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary">Send</v-btn>
      </v-card-actions>
    </v-card>
  </page-template>
</template>

<script>
import PageTemplate from '@/components/PageTemplate'

export default {
  components: {
    PageTemplate
  },
  data() {
    return {
      title: `Distribution`
    }
  }
}
</script>
