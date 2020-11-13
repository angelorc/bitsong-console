<template>
  <v-autocomplete
    v-model="lazyValue"
    required
    :label="label"
    :items="validators"
    item-text="text"
    item-value="value"
    @change="$emit('update:validator', lazyValue)"
  ></v-autocomplete>
</template>

<script>
export default {
  props: {
    value: null,
    label: {
      type: String,
      default: 'Validator'
    }
  },

  data() {
    return {
      lazyValue: this.value,
      validators: []
    }
  },

  watch: {
    value(val) {
      this.lazyValue = val
    }
  },

  async created() {
    const validators = await this.$btsg.getValidators()

    if (validators.result.length > 0) {
      this.validators = validators.result
        .sort((a, b) => {
          return b.tokens - a.tokens
        })
        .map(v => {
          return {
            value: v.operator_address,
            text: v.description.moniker
          }
        })
    }
  }
}
</script>
