<template>
  <dialog-confirmation
    title="Redelegate"
    :loading="loading"
    :memo="memo"
    :gas_price="gas_price"
    :gas_limit="gas_limit"
    :response="response"
    v-on:cancel="$emit('cancel')"
    v-on:confirm="$emit('confirm')"
  >
    <template v-slot:fields>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{ from_validator }}</v-list-item-title>
          <v-list-item-subtitle>From validator</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{ to_validator }}</v-list-item-title>
          <v-list-item-subtitle>To validator</v-list-item-subtitle>
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
    </template>
  </dialog-confirmation>
</template>

<script>
import { convertMicroDenom, convertMacroToMicroAmount } from '@/lib/utils'
import DialogConfirmation from '@/components/DialogConfirmation'

export default {
  components: {
    DialogConfirmation
  },
  props: {
    loading: {
      type: Boolean,
      default() {
        return false
      }
    },
    from_validator: String,
    to_validator: String,
    amount: String,
    coin: String,
    memo: String,
    gas_price: [String, Number],
    gas_limit: [String, Number],
    response: {
      type: Object,
      default() {
        return {
          success: false,
          log: null,
          tx_hash: null
        }
      }
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
    decimals() {
      return this.$store.getters['app/decimals']
    }
  }
}
</script>
