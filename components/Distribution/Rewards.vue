<template>
  <v-card :loading="loading" :disabled="loading">
    <div v-if="$vuetify.breakpoint.smAndDown">
      <template v-for="reward in rewards">
        <v-list-item three-line :key="reward.validator_address">
          <v-list-item-avatar>
            <validator-avatar
              :identity="reward.identity"
              :valoper="reward.validator_address"
              size="40px"
            />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              {{ reward.validator_name }}
            </v-list-item-title>
            <v-list-item-subtitle>
              Reward
              <amount
                v-if="reward.reward !== null"
                :micro-amount="reward.reward[0].amount"
                :denom="reward.reward[0].denom"
              />
              <span v-else>-</span>
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click="$emit('withdraw', reward.validator_address)">
              <v-icon>mdi-diamond-stone</v-icon>
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
            <div class="text-capitalize">Reward</div>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <template v-for="reward in rewards">
          <tr :key="reward.validator_address">
            <td>
              <div class="d-flex align-center">
                <validator-avatar
                  :identity="reward.identity"
                  :valoper="reward.validator_address"
                  size="40px"
                />
                <div>
                  <v-card-title>{{ reward.validator_name }}</v-card-title>
                  <v-card-subtitle>{{
                    reward.validator_address
                  }}</v-card-subtitle>
                </div>
              </div>
            </td>
            <td v-if="$vuetify.breakpoint.mdAndUp">
              <amount
                v-if="reward.reward !== null"
                :micro-amount="reward.reward[0].amount"
                :denom="reward.reward[0].denom"
              />
              <span v-else>-</span>
            </td>
            <td class="text-right">
              <v-btn icon @click="$emit('withdraw', reward.validator_address)">
                <v-icon>mdi-diamond-stone</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
      </tbody>
    </v-simple-table>
  </v-card>
</template>

<script>
import ValidatorAvatar from '@/components/ValidatorAvatar'

export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    rewards: {
      type: Array,
      default() {
        return []
      }
    }
  },

  components: {
    ValidatorAvatar
  }
}
</script>
