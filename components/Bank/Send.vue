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
      <input-address
        class="col-12 col-md-6"
        v-model="form.to_address"
        v-on:update:address="form.to_address = $event"
      ></input-address>
      <input-coin
        class="col-12 col-md-3"
        v-model="form.coin"
        v-on:update:coin="form.coin = $event"
      ></input-coin>
      <input-amount
        class="col-12 col-md-3"
        v-model="form.amount"
        :coin="form.coin"
        v-on:update:amount="form.amount = $event"
      ></input-amount>
    </template>

    <template v-slot:actions>
      <v-btn :disabled="disabled" color="primary" @click.stop="onSend">
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
import { Coin, Fee } from '@bitsongofficial/js-sdk'

import {
  convertMacroToMicroAmount,
  convertMicroToMacroAmount,
  parseErrorResponse
} from '@/lib/utils'
import BankSendConfirmation from '@/components/Bank/SendConfirmation'

export default {
  components: {
    BankSendConfirmation
  },
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
    disabled() {
      return (
        this.form.to_address === '' ||
        this.form.coin === null ||
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
        const amount = [
          new Coin(
            String(convertMacroToMicroAmount(this.form.amount, this.decimals)),
            this.form.coin.toLowerCase()
          )
        ]

        const fee = new Fee(
          [
            new Coin(
              String(this.form.gas_price * this.form.gas_limit),
              this.$store.getters['app/micro_stake_denom'].toLowerCase()
            )
          ],
          String(this.form.gas_limit)
        )

        const response = await this.$client.send(
          this.form.to_address,
          amount,
          this.form.memo,
          fee
        )
        this.response = parseErrorResponse(response)
      } catch (e) {
        if (e !== undefined) {
          console.error(e)
          this.response.log = e.message
        } else {
          this.response.log = `Something went wrong!`
        }
      }

      this.loadingModal = false
    }
  }
}
</script>
