<template>
  <dialog-confirmation
    title="Withdraw"
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
          <v-list-item-title>{{ validator }}</v-list-item-title>
          <v-list-item-subtitle>Validator</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="commission">
        <v-list-item-action>
          <v-checkbox disabled v-model="commission"></v-checkbox>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-subtitle
            >also wihtdraw validator's commission</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>
    </template>
  </dialog-confirmation>
</template>

<script>
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
    validator: String,
    commission: Boolean,
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
  }
}
</script>
