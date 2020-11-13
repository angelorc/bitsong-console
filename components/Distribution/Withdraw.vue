<template>
  <card-msg
    title="Withdraw rewards"
    subtitle="Withdraw rewards from a given delegation address, and optionally withdraw validator commission if the delegation address given is a validator operator."
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

      <v-checkbox
        class="col-12 col-md-6"
        :label="`also wihtdraw validator's commission`"
        v-model="form.commission"
      ></v-checkbox>
    </template>

    <template v-slot:actions>
      <v-btn :disabled="isDisabled" color="primary" @click.stop="onSend">
        Send
      </v-btn>
    </template>

    <template v-slot:dialog>
      <distribution-withdraw-confirmation
        v-if="showModal"
        :validator="form.validator"
        :commission="form.commission"
        :memo="form.memo"
        :gas_price="form.gas_price"
        :gas_limit="form.gas_limit"
        :loading="loadingModal"
        :response="response"
        v-on:cancel="onCancel"
        v-on:confirm="onConfirm"
      ></distribution-withdraw-confirmation>
    </template>
  </card-msg>
</template>

<script>
import { parseErrorResponse } from '@/lib/utils'
import DistributionWithdrawConfirmation from '@/components/Distribution/WithdrawConfirmation'

export default {
  props: {
    value: String
  },

  components: {
    DistributionWithdrawConfirmation
  },

  data: () => ({
    loading: false,
    loadingModal: false,
    showModal: false,
    form: {
      validator: null,
      commission: false,
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
      return this.form.validator === null
    },
    address() {
      return this.$store.getters[`wallet/address`]
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
        let payload = {
          delegator_address: this.address,
          validator_address: this.form.validator
        }

        const response = await this.$bitsong.withdrawDelegationReward(
          payload,
          this.form.commission,
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
