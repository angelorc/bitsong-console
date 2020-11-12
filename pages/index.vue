<template>
  <page-template>
    <v-app-bar
      app
      color="red darken-1"
      dark
      fixed
      v-if="$vuetify.breakpoint.smAndDown"
    >
      <v-toolbar-title class="text-h5"> {{ title }} </v-toolbar-title>
    </v-app-bar>
    <h1 v-else class="mb-8">{{ title }}</h1>
    <v-card class="mb-8">
      <v-container>
        <v-row>
          <v-col cols="12" md="7">
            <h6 class="text-h6 mb-1">Your address</h6>
            <span class="mr-2 address">{{ address }}</span>
            <v-btn icon>
              <v-icon>mdi-content-copy</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-qrcode-scan</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" md="5">
            <h6 class="text-h6">Your balance</h6>
            <amount
              v-if="balance !== null"
              style="font-size: 1.7em"
              :micro-amount="balance.amount"
              :denom="balance.denom"
            />
            <span v-else style="font-size: 1.7em">-</span>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <v-card class="mb-8">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h5">Faucet</v-list-item-title>
          <v-list-item-subtitle class="text-h6">Get faucet coin to test BitSong blockchain</v-list-item-subtitle>
          <v-list-item-subtitle class="pt-3 pt-2 subtitle-1">Faucet tokens are free tokens that you can use in {{ $store.getters[`app/chain_id`] }}. <span class="font-weight-medium">Please do not abuse!</span></v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn color="primary">Get Coins</v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-card>
    <v-card>
      <v-card-title>Last 10 Transactions</v-card-title>
    </v-card>
  </page-template>
</template>

<script>
import PageTemplate from '@/components/PageTemplate'

export default {
  middleware: 'authenticated',
  components: {
    PageTemplate,
  },
  data() {
    return {
      title: `Home`,
      loading: false,
      balance: null
    }
  },
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

        if (account.value && account.value.coins.length === 0) {
          this.balance = {
            amount: 0,
            denom: process.env.MICROSTAKEDENOM
          }
        }

        if (account.value && account.value.coins.length > 0) {
          const coin = account.value.coins.find(c => c.denom === process.env.MICROSTAKEDENOM)
          if (coin !== undefined) {
            this.balance = {
              amount: coin.amount,
              denom: process.env.MICROSTAKEDENOM
            }
          }
        }

        this.loading = false
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.address
  background-color: #2d2d2d
  border-radius: 4px
  color: #f8c555
  padding: 4px
  font-weight: bold
  font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace
  font-size: 1rem
  text-align: left
  line-height: 1.5
  word-spacing: normal
  word-break: normal
  word-wrap: break-word
  tab-size: 4
  hyphens: none
</style>
