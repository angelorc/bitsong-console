<template>
  <confirm-dialog :show-modal="showModal">
    <v-card :loading="loading" :disabled="loading">
      <v-toolbar dark color="primary">
        <v-toolbar-title>Send Coins</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ to_address }}</v-list-item-title>
            <v-list-item-subtitle>To address</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ amount }} {{ coin }}</v-list-item-title>
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
              <v-icon
                v-if="!advanced"
                color="grey lighten-1"
              >
                mdi-chevron-right
              </v-icon>
              <v-icon
                v-else
                color="grey lighten-1"
              >
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
            <v-list-item-title>{{ gas_price }} {{ $store.getters['app/micro_stake_denom'].toLowerCase() }}</v-list-item-title>
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
            <v-list-item-title><amount :micro-amount="networkFee" :denom="$store.getters['app/stake_denom']" /></v-list-item-title>
            <v-list-item-subtitle>Network Fee</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
       <v-card-actions>
         <v-spacer></v-spacer>
         <v-btn text @click="$emit('cancel')">Cancel</v-btn>
         <v-btn color="primary" @click="$emit('confirm')">Confirm</v-btn>
       </v-card-actions>
    </v-card>
  </confirm-dialog>

</template>

<script>
export default {
  props: ['loading', 'showModal', 'to_address', 'amount', 'coin', 'memo', 'gas_price', 'gas_limit'],
  data() {
    return {
      advanced: false
    }
  },
  computed: {
    networkFee() {
      return this.gas_price * this.gas_limit
    }
  }
}
</script>
