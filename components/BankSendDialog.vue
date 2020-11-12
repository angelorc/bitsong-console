<template>
  <confirm-dialog>
    <v-card :loading="loading" :disabled="loading">
      <v-toolbar flat>
        <v-toolbar-title>Send Coins</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-divider></v-divider>

      <div v-if="!response.success">
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{ to_address }}</v-list-item-title>
              <v-list-item-subtitle>To address</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <amount
                  :micro-amount="convertMacroToMicroAmount(amount, decimals)"
                  :denom="convertMicroDenom(coin)"
                />
              </v-list-item-title>
              <v-list-item-subtitle>Amount</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Advanced</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click.stop="advanced = !advanced">
                <v-icon v-if="!advanced" color="grey lighten-1">
                  mdi-chevron-right
                </v-icon>
                <v-icon v-else color="grey lighten-1">
                  mdi-chevron-down
                </v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-list-item v-if="advanced">
            <v-list-item-content>
              <v-list-item-title>{{ memo }}</v-list-item-title>
              <v-list-item-subtitle>Memo</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="advanced">
            <v-list-item-content>
              <v-list-item-title
                >{{ gas_price }}
                {{
                  $store.getters['app/micro_stake_denom'].toLowerCase()
                }}</v-list-item-title
              >
              <v-list-item-subtitle>Gas price</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="advanced">
            <v-list-item-content>
              <v-list-item-title>{{ gas_limit }}</v-list-item-title>
              <v-list-item-subtitle>Gas limit</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title
                ><amount
                  :micro-amount="networkFee"
                  :denom="$store.getters['app/stake_denom']"
              /></v-list-item-title>
              <v-list-item-subtitle>Network Fee</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-card-text v-if="response.log !== null">
          <v-alert dense text prominent color="red lighten-1">
            <strong>Error:</strong>
            {{ response.log }}
          </v-alert>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="$emit('cancel')">Cancel</v-btn>
          <v-btn color="primary" @click="$emit('confirm')">Confirm</v-btn>
        </v-card-actions>
      </div>

      <v-container v-if="response.success">
        <v-row>
          <v-col cols="12" class="text-center">
            <v-icon color="green" size="100"
              >mdi-checkbox-marked-circle-outline</v-icon
            >
            <h2 class="font-weight-medium">
              Your transaction has been completed
            </h2>
            <h3 class="font-weight-regular mt-4">Transaction Hash</h3>
            <div class="px-8 mt-2">
              <a
                :href="
                  `https://testnet.explorebitsong.com/transactions/${response.tx_hash}`
                "
                target="_blank"
                >{{ response.tx_hash }}</a
              >
            </div>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions v-if="response.success">
        <v-spacer></v-spacer>
        <v-btn text @click="$emit('cancel')">Close</v-btn>
      </v-card-actions>
    </v-card>
  </confirm-dialog>
</template>

<script>
import { convertMicroDenom, convertMacroToMicroAmount } from '@/lib/utils'

export default {
  props: [
    'loading',
    'to_address',
    'amount',
    'coin',
    'memo',
    'gas_price',
    'gas_limit',
    'response'
  ],
  data() {
    return {
      advanced: false
    }
  },
  methods: {
    convertMacroToMicroAmount(amt) {
      return convertMacroToMicroAmount(amt, this.decimals)
    },
    convertMicroDenom(denom) {
      return convertMicroDenom(denom)
    }
  },
  computed: {
    networkFee() {
      return this.gas_price * this.gas_limit
    },
    decimals() {
      return this.$store.getters['app/decimals']
    }
  }
}
</script>
