<template>
  <confirm-dialog>
    <v-card>
      <v-toolbar flat>
        <v-toolbar-title>Your address</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-divider></v-divider>
      <v-sheet height="400">
        <v-container class="fill-height">
          <v-row>
            <v-col class="text-center">
              <qrcode :value="address" :options="{ width: 250 }" />
              <markup :content="address" />
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>

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
