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
    <template v-slot:fields>
      <input-validator
        class="col-12 col-md-6"
        v-model="form.validator"
        v-on:update:validator="form.validator = $event"
      ></input-validator>

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
      <v-btn :disabled="isDisabled" color="primary" @click.stop="onSend">
        Send
      </v-btn>
    </template>

    <template v-slot:dialog>
      <staking-delegate-confirmation
        v-if="showModal"
        :validator="form.validator"
        :amount="form.amount"
        :coin="form.coin"
        :memo="form.memo"
        :gas_price="form.gas_price"
        :gas_limit="form.gas_limit"
        :loading="loadingModal"
        :response="response"
        v-on:cancel="onCancel"
        v-on:confirm="onConfirm"
      ></staking-delegate-confirmation>
    </template>
  </card-msg>
</template>

<script>
import { Coin, Fee } from '@bitsongofficial/js-sdk'

import { convertMacroToMicroAmount, parseErrorResponse } from '@/lib/utils'
import StakingDelegateConfirmation from '@/components/Staking/DelegateConfirmation'

export default {
  props: {
    value: String
  },

  components: {
    StakingDelegateConfirmation
  },

  data: () => ({
    loading: false,
    loadingModal: false,
    showModal: false,
    form: {
      validator: null,
      coin: null,
      amount: '',
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

  watch: {
    value(val) {
      this.form.validator = val
    }
  },

  computed: {
    isDisabled() {
      return (
        this.form.validator === null &&
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
        const amount = new Coin(
          String(convertMacroToMicroAmount(this.form.amount, this.decimals)),
          this.form.coin.toLowerCase()
        )

        const fee = new Fee(
          [
            new Coin(
              String(this.form.gas_price * this.form.gas_limit),
              this.$store.getters['app/micro_stake_denom'].toLowerCase()
            )
          ],
          String(this.form.gas_limit)
        )

        const response = await this.$client.delegate(
          this.form.validator,
          amount,
          this.form.memo,
          fee
        )
        this.response = parseErrorResponse(response)

        this.$emit('txSuccess')
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
