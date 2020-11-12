<template>
  <v-dialog
    :fullscreen="$vuetify.breakpoint.smAndDown"
    persistent
    max-width="400"
    :value="true"
  >
    <v-card :loading="loading" :disabled="loading">
      <v-toolbar flat>
        <v-toolbar-title v-text="title"></v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-divider></v-divider>

      <slot name="main">
        <div v-if="!response.success">
          <v-list>
            <slot name="fields" />

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
      </slot>

      <slot name="confirmation">
        <v-container v-if="response.success">
          <v-row>
            <v-col cols="12" class="text-center">
              <v-icon color="green" size="100"
                >mdi-checkbox-marked-circle-outline</v-icon
              >
              <h2 class="font-weight-medium">
                Your transaction<br />has been confirmed
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
      </slot>
    </v-card>
    <slot />
  </v-dialog>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default() {
        return false
      }
    },
    title: String,
    response: {
      type: Object,
      default() {
        return {
          success: false,
          log: null,
          tx_hash: null
        }
      }
    },
    memo: String,
    gas_price: {
      type: [String, Number],
      default() {
        return this.$store.getters['app/gas_price']
      }
    },
    gas_limit: {
      type: [String, Number],
      default() {
        return this.$store.getters['app/gas_limit']
      }
    }
  },
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
