<template>
  <v-autocomplete
    v-model="lazyValue"
    required
    label="Coin"
    :items="coins"
    item-text="text"
    item-value="denom"
    @change="$emit('update:coin', lazyValue)"
  ></v-autocomplete>
</template>

<script>
import { convertMicroDenom } from '@/lib/utils'

export default {
  props: {
    value: null
  },

  data() {
    return {
      lazyValue: this.value,
      coins: []
    }
  },

  watch: {
    value(val) {
      this.lazyValue = val
    }
  },

  async created() {
    let account = await this.$client.getAccount(this.address)
    account = account.result.result

    if (account.value && account.value.coins) {
      this.coins = account.value.coins.map(c => {
        if (c.denom.toUpperCase() === this.micro_stake_denom) {
          return {
            denom: this.micro_stake_denom,
            text: this.stake_denom
          }
        }

        return {
          denom: c.denom.toUpperCase(),
          text: convertMicroDenom(c.denom)
        }
      })
    }
  },

  computed: {
    address() {
      return this.$store.getters[`wallet/address`]
    },
    micro_stake_denom() {
      return this.$store.getters['app/micro_stake_denom']
    },
    stake_denom() {
      return this.$store.getters['app/stake_denom']
    }
  }
}
</script>
