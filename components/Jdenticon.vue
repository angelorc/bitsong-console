<template>
  <v-avatar color="white">
    <div style="margin-top:3px;margin-left:-1px" v-html="identicon"></div>
  </v-avatar>
</template>

<script>
import jdenticon from 'jdenticon'

export default {
  props: {
    address: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 40
    }
  },
  computed: {
    identicon: function() {
      return jdenticon.toSvg(this.address, this.size)
    }
  }
}
</script>
