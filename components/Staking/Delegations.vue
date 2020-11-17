<template>
  <v-card :loading="loading" :disabled="loading">
    <div v-if="$vuetify.breakpoint.smAndDown">
      <template v-for="delegation in delegations">
        <v-list-item three-line :key="delegation.validator_address">
          <v-list-item-avatar>
            <validator-avatar
              :identity="delegation.identity"
              :valoper="delegation.validator_address"
              size="40px"
            />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              {{ delegation.validator_name }}
            </v-list-item-title>
            <v-list-item-subtitle>
              Reward
              <amount
                :micro-amount="delegation.balance.amount"
                :denom="delegation.balance.denom"
              />
            </v-list-item-subtitle>
            <v-list-item-subtitle class="text-truncate">
              {{ delegation.validator_address }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn
              icon
              @click="$emit('delegate', delegation.validator_address)"
            >
              <v-icon>mdi-lock-plus-outline</v-icon>
            </v-btn>
            <v-btn icon @click="$emit('unbond', delegation.validator_address)">
              <v-icon>mdi-minus</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </template>
    </div>

    <v-simple-table v-else>
      <thead>
        <tr>
          <th width="60%">
            <div class="text-capitalize">Validator</div>
          </th>
          <th width="30%">
            <div class="text-capitalize">Amount</div>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <template v-for="delegation in delegations">
          <tr :key="delegation.validator_address">
            <td>
              <div class="d-flex align-center">
                <validator-avatar
                  :identity="delegation.identity"
                  :valoper="delegation.validator_address"
                  size="40px"
                />
                <div>
                  <v-card-title>{{ delegation.validator_name }}</v-card-title>
                  <v-card-subtitle>{{
                    delegation.validator_address
                  }}</v-card-subtitle>
                </div>
              </div>
            </td>
            <td v-if="$vuetify.breakpoint.mdAndUp">
              <amount
                :micro-amount="delegation.balance.amount"
                :denom="delegation.balance.denom"
              />
            </td>
            <td class="text-right">
              <v-btn
                icon
                @click="$emit('delegate', delegation.validator_address)"
              >
                <v-icon>mdi-lock-plus-outline</v-icon>
              </v-btn>
              <v-btn
                icon
                @click="$emit('unbond', delegation.validator_address)"
              >
                <v-icon>mdi-minus</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
      </tbody>
    </v-simple-table>
  </v-card>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    delegations: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>
