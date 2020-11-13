<template>
  <dialog-confirmation
    title="Edit Validator"
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
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{ commission }}</v-list-item-title>
          <v-list-item-subtitle>Commission rate</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{ min_self_delegation }}</v-list-item-title>
          <v-list-item-subtitle>Min self delegation</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{
            moniker === '' ? '[do-not-modify]' : moniker
          }}</v-list-item-title>
          <v-list-item-subtitle>Moniker</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{
            identity === '' ? '[do-not-modify]' : identity
          }}</v-list-item-title>
          <v-list-item-subtitle>Identity</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{
            website === '' ? '[do-not-modify]' : website
          }}</v-list-item-title>
          <v-list-item-subtitle>Website</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{
            security_contact === '' ? '[do-not-modify]' : security_contact
          }}</v-list-item-title>
          <v-list-item-subtitle>Security Contact</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title>Description</v-list-item-title>
          <v-list-item-subtitle>{{
            description === '' ? '[do-not-modify]' : description
          }}</v-list-item-subtitle>
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
    commission: String,
    min_self_delegation: String,
    moniker: String,
    identity: String,
    website: String,
    security_contact: String,
    description: String,
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
