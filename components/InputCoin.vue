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
    let balances = await this.$client.getAllBalances(this.address)

    if (balances) {
      this.coins = balances.map(c => {
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
