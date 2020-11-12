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

      // try {
      //   const payload = {
      //     from_address: this.address,
      //     to_address: this.form.to_address,
      //     amount: [
      //       {
      //         denom: this.form.coin.toLowerCase(),
      //         amount: String(
      //           convertMacroToMicroAmount(this.form.amount, this.decimals)
      //         )
      //       }
      //     ]
      //   }

      //   const response = await this.$bitsong.send(
      //     payload,
      //     this.address,
      //     this.form.memo,
      //     this.$store.getters['wallet/privateKey'],
      //     this.form.gas_price,
      //     this.form.gas_limit
      //   )

      //   this.response = parseErrorResponse(response)
      // } catch (e) {
      //   this.response.log = e.message
      // }

      this.loadingModal = false
    }
  }
}
</script>
