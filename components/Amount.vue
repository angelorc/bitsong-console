<template>
  <span>
    <span :class="{ 'display-1': large }">{{ integer }}</span
    ><span v-if="!noDecimals" :class="{ 'subtitle-1': large, caption: !large }"
      >.{{ decimals }} {{ macroDenom }}</span
    >
  </span>
</template>

<script>
import BigNumber from 'bignumber.js'
const dec = 6
export default {
  props: {
    microAmount: {
      type: [Number, String],
      default: 0,
    },
    denom: {
      type: String,
      required: true,
    },
    large: {
      type: Boolean,
      default: false,
    },
    noDecimals: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    macroDenom() {
      const startWithU = this.denom.charAt(0).toUpperCase() === 'U'
      return startWithU ? this.denom.replace('u', '').toUpperCase() : this.denom.toUpperCase()
    },
    number() {
      return new BigNumber(this.microAmount).div(10 ** dec).toFixed(dec)
    },
    integer() {
      let parts = this.number.toString().split('.')
      return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    },
    decimals() {
      let parts = this.number.toString().split('.')
      return parts[1]
    },
  },
}
</script>
