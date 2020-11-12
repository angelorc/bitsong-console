<template>
  <v-card class="mb-8" :loading="loading" :disabled="loading">
    <v-card-title>Send Coins</v-card-title>
    <v-card-subtitle>Transfer your coins to your friends.</v-card-subtitle>
    <v-divider></v-divider>
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-text-field label="Address"></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-autocomplete label="Coin" v-model="coin" :items="coins"></v-autocomplete>
        </v-col>
        <v-col cols="3">
          <v-text-field label="Amount" type="number" :suffix="coin"></v-text-field>
        </v-col>
      </v-row>
      <v-row v-if="advanced">
        <v-col cols="6">
          <v-text-field label="Memo (optional)"
            counter="100"
            v-validate="'max:100'"
            data-vv-name="memo"
            :error-messages="errors.collect('memo')"
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
            label="Gas Price"
            type="number"
            :suffix="$store.getters[`app/stakeDenom`].replace('u', '').toUpperCase()"
            required
            v-validate="'decimal:8|min_value:0'"
            data-vv-name="gas_price"
            :error-messages="errors.collect('gas_price')"
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
            label="Gas Limit"
            type="number"
            :suffix="$store.getters[`app/stakeDenom`].replace('u', '').toUpperCase()"
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
  </v-card>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    coins: [],
    coin: null,
    advanced: false
  }),
  created() {
    this.getAccount()
  },
  computed: {
    address() {
      return this.$store.getters[`wallet/address`]
    },
  },
  methods: {
    async getAccount() {
      try {
        this.loading = true
        const account = await this.$btsg.getAccount(this.address)

        if (account.value && account.value.coins) {
          this.coins = account.value.coins.map(c => {
            if (c.denom.toUpperCase() === process.env.MICROSTAKEDENOM.toUpperCase()) return process.env.STAKEDENOM.toUpperCase()
            return c.denom.toUpperCase()
          })
        }

        this.loading = false
      } catch (e) {
        console.error(e)
      }
    }
  },
  async onSend() {
    try {

    } catch (e) {
      console.error(e)
    }
  }
}
</script>
