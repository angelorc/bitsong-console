<template>
  <card-msg
    title="Delegate"
    subtitle="Delegate liquid tokens to a validator."
    :loading="loading"
    :memo="form.memo"
    :gas_price="form.gas_price"
    :gas_limit="form.gas_limit"
    v-on:update:memo="form.memo = $event"
    v-on:update:gas_price="form.gas_price = $event"
    v-on:update:gas_limit="form.gas_limit = $event"
  >
    <template v-slot:fields> </template>

    <template v-slot:actions>
      <v-btn :disabled="canContinue" color="primary" @click.stop="onSend">
        Send
      </v-btn>
    </template>

    <template v-slot:dialog> </template>
  </card-msg>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    loadingModal: false,
    showModal: true,
    form: {
      memo: '',
      gas_price: 0,
      gas_limit: 0
    },
    response: {
      success: false,
      log: null,
      tx_hash: null
    }
  }),

  created() {
    this.form.gas_price = this.$store.getters['app/gas_price']
    this.form.gas_limit = this.$store.getters['app/gas_limit']
  },

  computed: {
    canContinue() {
      return true
    }
  },
  methods: {
    onSend() {
      this.showModal = true
    },
    onCancel() {
      this.showModal = false
      this.resetResponse()
    },
    resetResponse() {
      this.response = {
        success: false,
        log: null,
        tx_hash: null
      }
    },
    async onConfirm() {
      this.resetResponse()
      this.loadingModal = true

      // bitsong-js-sdk

      this.loadingModal = false
    }
  }
}
</script>
