<template>
  <page-template>
    <v-app-bar
      app
      color="red darken-1"
      dark
      fixed
      v-if="$vuetify.breakpoint.smAndDown"
    >
      <v-toolbar-title class="text-h5"> {{ title }} </v-toolbar-title>
    </v-app-bar>
    <h1 v-else class="mb-8">{{ title }}</h1>
    <v-card class="mb-8">
      <v-container>
        <v-row>
          <v-col cols="12" md="7">
            <h6 class="text-h6 mb-1">Your address</h6>
            <span class="mr-2 address">{{ address }}</span>
            <v-btn icon>
              <v-icon>mdi-content-copy</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-qrcode-scan</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" md="5">
            <h6 class="text-h6">Your balance</h6>
            <amount
              style="font-size: 1.7em"
              :micro-amount="20000"
              denom="btsg"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-card>
      <v-card-title>Last 10 Transactions</v-card-title>
    </v-card>
  </page-template>
</template>

<script>
import PageTemplate from '@/components/PageTemplate'

export default {
  middleware: 'authenticated',
  components: {
    PageTemplate,
  },
  data() {
    return {
      title: `Home`,
    }
  },
  computed: {
    address() {
      return this.$store.getters[`wallet/address`]
    },
  },
}
</script>

<style lang="sass" scoped>
.address
  background-color: #2d2d2d
  border-radius: 4px
  color: #f8c555
  padding: 4px
  font-weight: bold
  font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace
  font-size: 1rem
  text-align: left
  line-height: 1.5
  word-spacing: normal
  word-break: normal
  word-wrap: break-word
  tab-size: 4
  hyphens: none
</style>
