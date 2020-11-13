<template>
  <card-msg
    title="Edit Validator"
    subtitle="Edit an existing validator account."
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
        v-on:update:validator="onValidatorSelected"
      ></input-validator>

      <v-text-field
        class="col-12 col-md-3"
        v-model="form.commission"
        :disabled="!form.validator"
        autocomplete="off"
        label="Commission"
        hint="eg: 0.10 (10%), 0.55 (55%), 1 (100%)"
        type="number"
        required
        v-validate="'decimal:18'"
        data-vv-name="commission"
        :error-messages="errors.collect('commission')"
      ></v-text-field>

      <v-text-field
        class="col-12 col-md-3"
        v-model="form.min_self_delegation"
        :disabled="!form.validator"
        autocomplete="off"
        label="Min. self delegation"
        hint="eg: 1"
        type="number"
        required
        v-validate="'integer'"
        data-vv-name="min_self_delegation"
        :error-messages="errors.collect('min_self_delegation')"
      ></v-text-field>

      <v-card-title class="pt-0 col-12">
        Description
      </v-card-title>

      <v-text-field
        class="col-12 col-md-6"
        v-model="form.moniker"
        :disabled="!form.validator"
        autocomplete="off"
        label="Moniker"
        hint="eg: StakeBit"
        required
        v-validate="'max:100'"
        data-vv-name="moniker"
        :error-messages="errors.collect('moniker')"
      ></v-text-field>

      <v-text-field
        class="col-12 col-md-6"
        v-model="form.identity"
        :disabled="!form.validator"
        autocomplete="off"
        label="Identity"
        hint="eg: FA8C5AD2A308E426 (Keybase identity)"
        required
        v-validate="'max:100'"
        data-vv-name="identity"
        :error-messages="errors.collect('identity')"
      ></v-text-field>

      <v-text-field
        class="col-12 col-md-6"
        v-model="form.website"
        :disabled="!form.validator"
        autocomplete="off"
        label="Website"
        hint="eg: https://stakebit.btsg"
        required
        v-validate="'max:150'"
        data-vv-name="website"
        :error-messages="errors.collect('website')"
      ></v-text-field>

      <v-text-field
        class="col-12 col-md-6"
        v-model="form.security_contact"
        :disabled="!form.validator"
        autocomplete="off"
        label="Security Contact"
        hint="eg: security@stakebit.btsg"
        required
        v-validate="'max:100'"
        data-vv-name="security_contact"
        :error-messages="errors.collect('security_contact')"
      ></v-text-field>

      <v-textarea
        class="col-12"
        v-model="form.description"
        :disabled="!form.validator"
        label="Validator description"
        counter="300"
      ></v-textarea>
    </template>

    <template v-slot:actions>
      <v-btn :disabled="isDisabled" color="primary" @click.stop="onSend">
        Send
      </v-btn>
    </template>

    <template v-slot:dialog>
      <staking-edit-validator-confirmation
        v-if="showModal"
        :validator="form.validator"
        :commission="form.commission"
        :min_self_delegation="form.min_self_delegation"
        :moniker="form.moniker"
        :identity="form.identity"
        :website="form.website"
        :security_contact="form.security_contact"
        :description="form.description"
        :memo="form.memo"
        :gas_price="form.gas_price"
        :gas_limit="form.gas_limit"
        :loading="loadingModal"
        :response="response"
        v-on:cancel="onCancel"
        v-on:confirm="onConfirm"
      ></staking-edit-validator-confirmation>
    </template>
  </card-msg>
</template>

<script>
import { convertMacroToMicroAmount, parseErrorResponse } from '@/lib/utils'
import StakingEditValidatorConfirmation from '@/components/Staking/EditValidatorConfirmation'

import InputAddress from '@/components/InputAddress'

export default {
  props: {
    value: String
  },

  components: {
    StakingEditValidatorConfirmation,
    InputAddress
  },

  data: () => ({
    loading: false,
    loadingModal: false,
    showModal: false,
    form: {
      validator: null,
      commission: null,
      min_self_delegation: null,
      moniker: null,
      identity: null,
      website: null,
      security_contact: null,
      description: null,
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
    async onValidatorSelected(evt) {
      this.loading = true

      let val = await this.$btsg.getValidator(evt)
      val = val.result

      this.form.validator = val.operator_address
      this.form.commission = val.commission.commission_rates.rate
      this.form.min_self_delegation = val.min_self_delegation
      this.form.moniker = val.description.moniker
      this.form.identity = val.description.identity
      this.form.website = val.description.website
      this.form.security_contact = val.description.security_contact
      this.form.description = val.description.details

      this.loading = false
    },
    async onConfirm() {
      this.resetResponse()
      this.loadingModal = true

      try {
        const payload = {
          description: {
            moniker: this.form.moniker,
            identity: this.form.identity,
            website: this.form.website,
            security_contact: this.form.security_contact,
            details: this.form.details
          },
          address: this.form.validator,
          commission_rate: this.form.commission_rate,
          min_self_delegation: this.form.min_self_delegation
        }

        const response = await this.$bitsong.editValidator(
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
