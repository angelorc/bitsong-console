<template>
  <v-text-field
    v-model="lazyValue"
    label="To address"
    :hint="`es: bitsong12kr8je8lcats0c5n94xlzhu7vs7s9dvvd7devl`"
    required
    clearable
    v-validate="rulesRecipient"
    data-vv-name="recipient"
    :error-messages="errors.collect('recipient')"
    @change="$emit('update:address', lazyValue)"
  ></v-text-field>
</template>

<script>
export default {
  props: {
    value: null
  },

  data() {
    return {
      lazyValue: this.value
    }
  },

  watch: {
    value(val) {
      this.lazyValue = val
    }
  },

  beforeCreate() {
    this.$_modelEvent =
      (this.$options.model && this.$options.model.event) || 'input'
  },

  computed: {
    address_length() {
      return this.$store.getters['app/address_length']
    },
    rulesRecipient() {
      return {
        required: true,
        regex: /^bitsong1/,
        max: this.address_length,
        min: this.address_length
      }
    }
  }
}
</script>
