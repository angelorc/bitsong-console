<template>
  <card-msg
    title="Send Coins"
    subtitle="Transfer your coins to your friends."
    :loading="loading"
    :memo="form.memo"
    :gas_price="form.gas_price"
    :gas_limit="form.gas_limit"
    v-on:update:memo="form.memo = $event"
    v-on:update:gas_price="form.gas_price = $event"
    v-on:update:gas_limit="form.gas_limit = $event"
  >
    <template v-slot:fields>
      <v-col cols="12" md="6">
        <input-address
          v-model="form.to_address"
          v-on:update:address="form.to_address = $event"
        ></input-address>
      </v-col>

      <v-col cols="6" md="3">
        <input-coin
          v-model="form.coin"
          v-on:update:coin="form.coin = $event"
        ></input-coin>
      </v-col>
      <v-col cols="6" md="3">
        <input-amount
          v-model="form.amount"
          :coin="form.coin"
          v-on:update:amount="form.amount = $event"
        ></input-amount>
      </v-col>
    </template>

    <template v-slot:actions>
      <v-btn :disabled="canContinue" color="primary" @click.stop="onSend">
        Send
      </v-btn>
    </template>

    <template v-slot:dialog>
      <bank-send-confirmation
        v-if="showModal"
        :to_address="form.to_address"
        :amount="form.amount"
        :coin="form.coin"
        :memo="form.memo"
        :gas_price="form.gas_price"
        :gas_limit="form.gas_limit"
        :loading="loadingModal"
        :response="response"
        v-on:cancel="onCancel"
        v-on:confirm="onConfirm"
      ></bank-send-confirmation>
    </template>
  </card-msg>
</template>

<script>
import {
  convertMacroToMicroAmount,
  convertMicroToMacroAmount,
  parseErrorResponse
} from '@/lib/utils'

export default {
  data: () => ({
    loading: false,
    loadingModal: false,

    showModal: false,
    response: {
      success: false,
      log: null,
      tx_hash: null
    },
    form: {
      to_address: '',
      coin: null,
      amount: '',
      memo: '',
      gas_price: 0,
      gas_limit: 0
    }
  }),

  created() {
    this.form.gas_price = this.$store.getters['app/gas_price']
    this.form.gas_limit = this.$store.getters['app/gas_limit']
  },

  computed: {
    canContinue() {
      return (
        this.form.to_address === '' &&
        this.form.coin === null &&
        this.form.amount === ''
      )
    },
    address() {
      return this.$store.getters[`wallet/address`]
    },
    decimals() {
      return this.$store.getters['app/decimals']
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

      try {
        const payload = {
          from_address: this.address,
          to_address: this.form.to_address,
          amount: [
            {
              denom: this.form.coin.toLowerCase(),
              amount: String(
                convertMacroToMicroAmount(this.form.amount, this.decimals)
              )
            }
          ]
        }

        const response = await this.$bitsong.send(
          payload,
          this.address,
          this.form.memo,
          this.$store.getters['wallet/privateKey'],
          this.form.gas_price,
          this.form.gas_limit
        )

        this.response = parseErrorResponse(response)
      } catch (e) {
        this.response.log = e.message
      }

      this.loadingModal = false
    }
  }
}
</script>
