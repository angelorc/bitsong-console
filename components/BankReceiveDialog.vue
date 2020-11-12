<template>
  <confirm-dialog :show-modal="showModal">
    <v-card :loading="loading" :disabled="loading">
      <v-toolbar dark color="primary">
        <v-toolbar-title>Your address</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text class="text-center">
        <qrcode :value="address" :options="{ width: 250 }" />
        <markup :content="address" />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="$emit('close')">Close</v-btn>
      </v-card-actions>
    </v-card>
  </confirm-dialog>

</template>

<script>
import qrcode from '@chenfengyuan/vue-qrcode'
import Markup from '@/components/Markup'

export default {
  props: ['showModal'],
  components: {
    qrcode,
    Markup
  },
  computed: {
    address() {
      return this.$store.getters['wallet/address']
    }
  }
}
</script>
