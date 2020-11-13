<template>
  <card-msg
    title="Redelegate"
    subtitle="Redelegate illiquid tokens from one validator to another."
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
        class="col-12 col-md-4"
        label="From validator"
        v-model="form.from_validator"
        v-on:update:validator="form.from_validator = $event"
      ></input-validator>
      <input-validator
        class="col-12 col-md-4"
        label="To validator"
        v-model="form.to_validator"
        v-on:update:validator="form.to_validator = $event"
      ></input-validator>
      <input-coin
        class="col-6 col-md-2"
        v-model="form.coin"
        v-on:update:coin="form.coin = $event"
      ></input-coin>
      <input-amount
        class="col-6 col-md-2"
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
      <staking-redelegate-confirmation
        v-if="showModal"
        :from_validator="form.from_validator"
        :to_validator="form.to_validator"
        :amount="form.amount"
        :coin="form.coin"
        :memo="form.memo"
        :gas_price="form.gas_price"
        :gas_limit="form.gas_limit"
        :loading="loadingModal"
        :response="response"
        v-on:cancel="onCancel"
        v-on:confirm="onConfirm"
      ></staking-redelegate-confirmation>
    </template>
  </card-msg>
</template>

<script>
import { convertMacroToMicroAmount, parseErrorResponse } from '@/lib/utils'
import StakingRedelegateConfirmation from '@/components/Staking/RedelegateConfirmation'

export default {
  props: {
    value: String
  },

  components: {
    StakingRedelegateConfirmation
  },

  data: () => ({
    loading: false,
    loadingModal: false,
    showModal: false,
    form: {
      from_validator: null,
      to_validator: null,
      coin: null,
      amount: '',
      memo: '',
      gas_price: 0,
      gas_limit: 280000
    },
    response: {
      success: false,
      log: null,
      tx_hash: null
    }
  }),

  created() {
    this.form.gas_price = this.$store.getters['app/gas_price']
    //this.form.gas_limit = this.$store.getters['app/gas_limit']
  },

  watch: {
    value(val) {
      this.form.validator = val
    }
  },

  computed: {
    isDisabled() {
      return (
        this.form.from_validator === null &&
        this.form.to_validator === null &&
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
          validator_src_address: this.form.from_validator,
          validator_dst_address: this.form.to_validator,
          amount: {
            denom: this.form.coin.toLowerCase(),
            amount: String(
              convertMacroToMicroAmount(this.form.amount, this.decimals)
            )
          }
        }

        const response = await this.$bitsong.redelegate(
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
