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
        <v-text-field
          v-model="form.to_address"
          label="To address"
          :hint="`es: ${address}`"
          required
          clearable
          v-validate="rulesRecipient"
          data-vv-name="recipient"
          :error-messages="errors.collect('recipient')"
        ></v-text-field>
      </v-col>
      <v-col cols="6" md="3">
        <v-autocomplete
          v-model="form.coin"
          required
          label="Coin"
          :items="coins"
          item-text="text"
          item-value="denom"
        ></v-autocomplete>
      </v-col>
      <v-col cols="6" md="3">
        <v-text-field
          v-model="form.amount"
          autocomplete="off"
          placeholder="Amount"
          :hint="balanceText"
          type="number"
          required
          :suffix="convertMicroDenom(form.coin)"
          v-validate="'decimal:6'"
          data-vv-name="amount"
          :error-messages="errors.collect('amount')"
        ></v-text-field>
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
  convertMicroDenom,
  parseErrorResponse
} from '@/lib/utils'

export default {
  data: () => ({
    loading: false,
    loadingModal: false,
    coins: [],
    balance: [],
    advanced: false,
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
    this.getAccount()
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
    micro_stake_denom() {
      return this.$store.getters['app/micro_stake_denom']
    },
    stake_denom() {
      return this.$store.getters['app/stake_denom']
    },
    address_prefix() {
      return this.$store.getters['app/address_prefix']
    },
    address_length() {
      return this.$store.getters['app/address_length']
    },
    decimals() {
      return this.$store.getters['app/decimals']
    },
    rulesRecipient() {
      return {
        required: true,
        regex: /^bitsong1/,
        max: this.address_length,
        min: this.address_length
      }
    },
    balanceText() {
      if (this.balance.length === 0) return `Max: 0 ${this.stake_denom}`

      let coin
      if (this.form.coin === null) {
        coin = this.balance.find(
          c => c.text.toUpperCase() === this.micro_stake_denom
        )
        if (coin === undefined) return `Max: 0 ${this.stake_denom}`
        return `Max: ${convertMicroToMacroAmount(coin.amount, this.decimals)} ${
          this.stake_denom
        }`
      }

      coin = this.balance.find(
        c => c.denom.toUpperCase() === this.form.coin.toUpperCase()
      )

      if (coin === undefined)
        return `Max: 0 ${convertMicroDenom(this.form.coin)}`
      return `Max: ${convertMicroToMacroAmount(
        coin.amount,
        this.decimals
      )}${convertMicroDenom(coin.denom)}`
    }
  },
  methods: {
    convertMicroDenom(denom) {
      return convertMicroDenom(denom)
    },
    async getAccount() {
      try {
        this.loading = true
        const account = await this.$btsg.getAccount(this.address)

        if (account.value && account.value.coins) {
          this.coins = account.value.coins.map(c => {
            if (c.denom.toUpperCase() === this.micro_stake_denom) {
              return {
                denom: this.micro_stake_denom,
                text: this.stake_denom
              }
            }

            return {
              denom: c.denom.toUpperCase(),
              text: convertMicroDenom(c.denom)
            }
          })
          this.balance = account.value.coins.map(c => {
            return {
              ...c,
              text: convertMicroDenom(c.denom)
            }
          })
        }

        this.loading = false
      } catch (e) {
        console.error(e)
      }
    },
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
