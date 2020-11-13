<template>
  <v-card :loading="loading" :disabled="loading">
    <v-card-title v-text="title"></v-card-title>
    <v-card-subtitle v-text="subtitle"></v-card-subtitle>
    <v-divider></v-divider>
    <v-container>
      <v-row>
        <slot name="fields" />
      </v-row>
      <v-row v-if="advanced">
        <v-col cols="12" md="6">
          <v-text-field
            v-model="memo"
            label="Memo (optional)"
            counter="100"
            v-validate="'max:100'"
            data-vv-name="memo"
            :error-messages="errors.collect('memo')"
            @keyup="$emit('update:memo', memo)"
          ></v-text-field>
        </v-col>
        <v-col cols="6" md="3">
          <v-text-field
            v-model="gas_limit"
            label="Gas Limit"
            type="number"
            required
            data-vv-name="gas_limit"
            v-validate="'integer|min_value:0|max_value:2000000'"
            :error-messages="errors.collect('gas_limit')"
            @keyup="$emit('update:gas_limit', gas_limit)"
          ></v-text-field>
        </v-col>
        <v-col cols="6" md="3">
          <v-text-field
            v-model="gas_price"
            label="Gas Price"
            type="number"
            :suffix="$store.getters[`app/micro_stake_denom`].toLowerCase()"
            required
            v-validate="'decimal:8|min_value:0'"
            data-vv-name="gas_price"
            :error-messages="errors.collect('gas_price')"
            @keyup="$emit('update:gas_price', gas_price)"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
    <v-card-actions>
      <v-switch
        v-model="advanced"
        label="ADVANCED"
        class="ml-2 font-weight-bold"
      ></v-switch>
      <v-spacer></v-spacer>

      <slot name="actions" />
    </v-card-actions>

    <slot name="dialog" />
  </v-card>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default() {
        return false
      }
    },
    title: String,
    subtitle: String,
    memo: String,
    gas_price: [Number, String],
    gas_limit: [Number, String]
  },
  data() {
    return {
      advanced: false
    }
  }
}
</script>
