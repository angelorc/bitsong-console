<template>
  <card-msg
    title="Unbond"
    subtitle="Unbond tokens from a validator."
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
        class="col-6 col-md-3"
        v-model="form.coin"
        v-on:update:coin="form.coin = $event"
      ></input-coin>
      <input-amount
        class="col-6 col-md-3"
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
      <staking-unbond-confirmation
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
      ></staking-unbond-confirmation>
    </template>
  </card-msg>
</template>

<script>
import { convertMacroToMicroAmount, parseErrorResponse } from '@/lib/utils'
import StakingUnbondConfirmation from '@/components/Staking/UnbondConfirmation'

export default {
  props: {
    value: String
  },

  components: {
    StakingUnbondConfirmation
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
        const payload = {
          delegator_address: this.address,
          validator_address: this.form.validator,
          amount: {
            denom: this.form.coin.toLowerCase(),
            amount: String(
              convertMacroToMicroAmount(this.form.amount, this.decimals)
            )
          }
        }

        const response = await this.$bitsong.unbond(
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
