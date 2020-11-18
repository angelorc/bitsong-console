<template>
  <v-dialog
    persistent
    max-width="400"
    :value="true"
  >
    <v-card>
      <v-card-title>Update available!</v-card-title>
      <div class="subtitle-1 mx-6 mb-2">
        A new update is available. Please, reload the console.
      </div>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" depressed @click="reload">Reload</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  methods: {
    reload() {
      window.location.reload(true)
    }
  }
}
</script>
