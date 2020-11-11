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
      <v-card-title>Sign</v-card-title>
      <v-card-subtitle>Sign transactions generated offline.</v-card-subtitle>
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
      <v-card-title>Multisign</v-card-title>
      <v-card-subtitle>Generate multisig signatures for transactions generated offline.</v-card-subtitle>
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
      title: `Auth`
    }
  }
}
</script>
