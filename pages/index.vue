<template>
  <page-template>
    <page-app-bar :title="title"></page-app-bar>
    <v-card class="mb-8">
      <v-container>
        <v-row>
          <v-col cols="12" md="7">
            <h6 class="text-h6 mb-1">Your address</h6>
            <v-container class="pa-0">
              <v-row>
                <v-col cols="10" class="py-0">
                  <markup :content="address"></markup>
                </v-col>
                <v-col cols="2">
                  <v-btn icon @click.stop="showAddress = true">
                    <v-icon>mdi-qrcode-scan</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
            <bank-receive-dialog
              v-if="showAddress"
              v-on:close="onCloseAddress"
            ></bank-receive-dialog>
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

    <v-container class="pa-0 mb-8">
      <v-row>
        <v-col>
          <v-card height="138">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="title"
                  >Emoney Explorer</v-list-item-title
                >
                <v-list-item-subtitle class="subtitle-2"
                  >Explore your account</v-list-item-subtitle
                >
              </v-list-item-content>
              <v-list-item-action>
                <v-btn
                  target="_blank"
                  :href="`https://e-money.net/account/${this.address}`"
                  icon
                >
                  <v-icon>mdi-arrow-right</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-card-text
              class="subtitle-1 pt-0"
              :class="{ 'grey--text text--darken-3': !$vuetify.theme.dark }"
            >
              Use the Emoney Explorer to see your account
              <span class="font-weight-medium">analytics.</span>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </page-template>
</template>

<script>
import PageTemplate from '@/components/PageTemplate'
import BankReceiveDialog from '@/components/Bank/ReceiveDialog'

export default {
  middleware: 'authenticated',
  components: {
    PageTemplate,
    BankReceiveDialog
  },
  data() {
    return {
      title: `Home`,
      loading: false,
      balance: null,
      showAddress: false
    }
  },
  created() {
    this.getAccount()
  },
  computed: {
    address() {
      return this.$store.getters[`wallet/address`]
    }
  },
  methods: {
    async getAccount() {
      try {
        this.loading = true
        let account = await this.$client.getAccount(this.address)
        account = account.result.result

        if (account.value && account.value.coins.length === 0) {
          this.balance = {
            amount: 0,
            denom: process.env.MICROSTAKEDENOM
          }
        }

        if (account.value && account.value.coins.length > 0) {
          const coin = account.value.coins.find(
            c => c.denom === process.env.MICROSTAKEDENOM
          )
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
    },
    onCloseAddress() {
      this.showAddress = false
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
