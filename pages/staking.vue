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
      <v-card-title>Create Validator</v-card-title>
      <v-card-subtitle>Create new validator initialized with a self-delegation to it.</v-card-subtitle>
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
    <v-card class="mb-8">
      <v-card-title>Edit Validator</v-card-title>
      <v-card-subtitle>Edit an existing validator account.</v-card-subtitle>
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
    <v-card class="mb-8">
      <v-card-title>Delegate</v-card-title>
      <v-card-subtitle>Delegate liquid tokens to a validator</v-card-subtitle>
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
    <v-card class="mb-8">
      <v-card-title>Redelegate</v-card-title>
      <v-card-subtitle>Redelegate illiquid tokens from one validator to another</v-card-subtitle>
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
    <v-card class="mb-8">
      <v-card-title>Unbond</v-card-title>
      <v-card-subtitle>Unbond tokens from a validator</v-card-subtitle>
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
      title: `Staking`
    }
  }
}
</script>
