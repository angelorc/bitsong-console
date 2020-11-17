<template>
  <page-template>
    <page-app-bar title="Distribution"></page-app-bar>

    <distribution-rewards :loading="loading" :rewards="rewards" v-on:withdraw="onWithdraw" class="mb-8" />

    <distribution-withdraw
      id="withdraw"
      class="mb-8"
      v-model="withdraw"
      v-on:txSuccess="getRewards"
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
      loading: false,
      withdraw: null,
      rewards: []
    }
  },

  created() {
    this.getRewards()
  },

  methods: {
    async getRewards() {
      try {
        this.loading = true
        const validators = await this.$btsg.getValidators()
        const rewards = await this.$btsg.getDelegatorRewards(this.address)

        this.rewards = rewards.rewards
          .map(r => {
            const val = validators.result.find(
              v => v.operator_address === r.validator_address
            )
            return {
              ...r,
              validator_name: val !== undefined ? val.description.moniker : '',
              identity: val !== undefined ? val.description.identity : '',
              amt: r.reward === null ? 0 : r.reward[0].amount
            }
          })
          .sort((a, b) => {
            return b.amt - a.amt
          })

        this.loading = false
      } catch (e) {
        console.error(e)
      }
    },
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
