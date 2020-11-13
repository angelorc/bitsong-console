<template>
  <v-card>
    <v-card-title>Sign</v-card-title>
    <v-card-subtitle>Sign transactions generated offline.</v-card-subtitle>
    <v-divider></v-divider>

    <v-textarea
      class="col-12"
      v-model="transaction"
      clearable
      clear-icon="mdi-close-circle"
      auto-grow
      placeholder="Transaction generated offline"
    ></v-textarea>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="transaction === null"
        color="primary"
        @click.stop="onSign"
      >
        Sign
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  middleware: 'authenticated',

  data() {
    return {
      transaction: null
    }
  },
  methods: {
    onSign() {
      console.log(this.transaction)
    }
  }
}
</script>
