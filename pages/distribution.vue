<template>
  <page-template>
    <page-app-bar title="Distribution"></page-app-bar>

    <distribution-rewards v-on:withdraw="onWithdraw" class="mb-8" />

    <distribution-withdraw
      id="withdraw"
      v-model="withdraw"
      class="mb-8"
    ></distribution-withdraw>
  </page-template>
</template>

<script>
import PageTemplate from '@/components/PageTemplate'
import DistributionRewards from '@/components/Distribution/Rewards'
import DistributionWithdraw from '@/components/Distribution/Withdraw'

export default {
  middleware: 'authenticated',

  head() {
    const title = `Distribution ${this.address}`
    return {
      title: title,
      meta: [{ hid: 'og-title', name: 'og:title', content: title }]
    }
  },

  components: {
    PageTemplate,
    DistributionRewards,
    DistributionWithdraw
  },

  data() {
    return {
      withdraw: null
    }
  },

  methods: {
    onWithdraw(valoper) {
      this.withdraw = valoper
      this.$vuetify.goTo('#withdraw', {
        duration: 300,
        offset: 0,
        easing: 'easeInOutCubic'
      })
    }
  },
  computed: {
    address() {
      return this.$store.getters['wallet/address']
    }
  }
}
</script>
