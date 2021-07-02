<template>
  <div>
    <WalletHeader title="Set up your crypto wallet" />
    <markup class="px-4" title="Your Address" :content="address" />
    <markup class="px-4" title="Your Private Key" :content="privateKey" />

    <v-card-actions class="py-6">
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="onContinue">Go to Console</v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import WalletHeader from '@/components/wallet/common/Header'
import Markup from '@/components/Markup'

export default {
  components: {
    WalletHeader,
    Markup
  },
  computed: {
    address() {
      return this.$store.getters[`wallet/address`]
    },
    privateKey() {
      return this.$store.getters[`wallet/privateKey`]
    }
  },
  methods: {
    onContinue() {
      this.$emit('onContinue')
    }
  }
}
</script>
