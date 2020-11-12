<template>
  <v-card class="mb-8" :loading="loading" :disabled="loading">
    <v-card-title>Send Coins</v-card-title>
    <v-card-subtitle>Transfer your coins to your friends.</v-card-subtitle>
    <v-divider></v-divider>
    <v-container>
      <v-row>
        <v-col cols="6">
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
        <v-col cols="3">
          <v-autocomplete
            v-model="form.coin"
            required
            label="Coin"
            :items="coins"
          ></v-autocomplete>
        </v-col>
        <v-col cols="3">
          <v-text-field
            v-model="form.amount"
            autocomplete="off"
            placeholder="Amount"
            :hint="balanceText"
            type="number"
            required
            :suffix="form.coin"
            v-validate="'decimal:6'"
            data-vv-name="amount"
            :error-messages="errors.collect('amount')"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row v-if="advanced">
        <v-col cols="6">
          <v-text-field
            v-model="form.memo"
            label="Memo (optional)"
            counter="100"
            v-validate="'max:100'"
            data-vv-name="memo"
            :error-messages="errors.collect('memo')"
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
            v-model="form.gas_price"
            label="Gas Price"
            type="number"
            :suffix="$store.getters[`app/stake_denom`]"
            required
            v-validate="'decimal:8|min_value:0'"
            data-vv-name="gas_price"
            :error-messages="errors.collect('gas_price')"
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
            v-model="form.gas_limit"
            label="Gas Limit"
            type="number"
            :suffix="$store.getters[`app/stake_denom`]"
            required
            data-vv-name="gas_limit"
            v-validate="'integer|min_value:0'"
            :error-messages="errors.collect('gas_limit')"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
    <v-card-actions>
       <v-switch
        v-model="advanced"
        label="ADVANCED"
        class="ml-2 font-weight-bold"
      ></v-switch>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click.stop="onSend">Send</v-btn>
    </v-card-actions>
    <bank-send-dialog
      :show-modal="showModal"
      :to_address="form.to_address"
      :amount="form.amount"
      :coin="form.coin"
      :memo="form.memo"
      :gas_price="form.gas_price"
      :gas_limit="form.gas_limit"
      :loading="loading"
      v-on:cancel="onCancel"
      v-on:confirm="onConfirm"
    ></bank-send-dialog>
  </v-card>
</template>

<script>
import { convertMacroToMicroAmount, convertMicroToMacroAmount } from '@/lib/utils'

export default {
  data: () => ({
    loading: false,
    coins: [],
    balance: [],
    advanced: false,
    showModal: false,
    form: {
      to_address: '',
      coin: null,
      amount: '',
      memo: '',
      gas_price: 0,
      gas_limit: 0,
    }
  }),
  created() {
    this.getAccount()
    this.form.gas_price = this.$store.getters['app/gas_price']
    this.form.gas_limit = this.$store.getters['app/gas_limit']
  },
  computed: {
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
      if (this.balance.length === 0) return `Your balance: 0 ${this.stake_denom}`

      let coin
      if (this.form.coin === null) {
        coin = this.balance.find(c => c.denom.toUpperCase() === this.micro_stake_denom)
        if (coin === undefined) return `Your balance: 0 ${this.stake_denom}`
        return `Your balance: ${convertMicroToMacroAmount(coin.amount, this.decimals)} ${this.stake_denom}`
      }

      coin = this.balance.find(c => c.denom.toUpperCase() === this.form.coin)
      if (coin === undefined) return `Your balance: 0 ${this.form.coin}`
      return `Your balance: ${convertMicroToMacroAmount(coin.amount, this.decimals)}${coin.denom.toUpperCase()}`
    },
  },
  methods: {
    async getAccount() {
      try {
        this.loading = true
        const account = await this.$btsg.getAccount(this.address)

        if (account.value && account.value.coins) {
          this.coins = account.value.coins.map(c => {
            if (c.denom.toUpperCase() === this.micro_stake_denom) return this.stake_denom
            return c.denom.toUpperCase()
          })
          this.balance = account.value.coins
        }

        this.loading = false
      } catch (e) {
        console.error(e)
      }
    },
    onSend() {
      try {
        this.showModal = true
      } catch (e) {
        console.error(e)
      }
    },
    onCancel() {
      this.showModal = false
    },
    async onConfirm() {
      this.loading = true

      const payload = {
        from_address: this.address,
        to_address: this.form.to_address,
        amount: [
          {
            amount: String(convertMacroToMicroAmount(this.form.amount)),
            denom: this.form.coin
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

      console.log(response)
      this.loading = false
    }
  },
}
</script>
