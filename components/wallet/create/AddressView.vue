<template>
  <div>
    <WalletHeader title="Set up your crypto wallet" />
    <markup class="px-4" title="Your Address" :content="address" />
    <markup class="px-4" title="Your Private Key" :content="privateKey" />

    <v-card-actions class="py-6">
      <v-spacer></v-spacer>
      <v-btn v-if="!downloaded" @click="onContinue" text>Skip</v-btn>
      <v-btn v-if="!downloaded" color="primary" @click="onDownload"
        >Download Keystore file</v-btn
      >
      <v-btn v-if="downloaded" color="primary" @click="onContinue"
        >Go to BitSong</v-btn
      >
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
  data() {
    return {
      downloaded: false
    }
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
    async onDownload() {
      await this.$store.dispatch(`wallet/generateAndDownloadKeyStore`)
      this.downloaded = true
    },
    onContinue() {
      this.downloaded = false
      this.$emit('onContinue')
    }
  }
}
</script>
