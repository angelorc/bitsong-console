<template>
  <page-template>
    <page-app-bar title="Staking"></page-app-bar>

    <staking-delegations
      class="mb-8"
      :loading="loading"
      :delegations="delegations"
      v-on:delegate="onDelegate"
      v-on:unbond="onUnbond"
    />

    <staking-delegate
      id="delegate"
      v-model="delegate"
      class="mb-8"
      v-on:txSuccess="getDelegations"
    ></staking-delegate>
    <staking-unbond id="unbond" v-model="unbond" class="mb-8" v-on:txSuccess="getDelegations"></staking-unbond>
    <staking-redelegate class="mb-8" v-on:txSuccess="getDelegations"></staking-redelegate>
    <staking-edit-validator class="mb-8" v-on:txSuccess="getDelegations"></staking-edit-validator>
  </page-template>
</template>

<script>
import PageTemplate from '@/components/PageTemplate'
import StakingDelegations from '@/components/Staking/Delegations'
import StakingDelegate from '@/components/Staking/Delegate'
import StakingUnbond from '@/components/Staking/Unbond'
import StakingRedelegate from '@/components/Staking/Redelegate'
import StakingEditValidator from '@/components/Staking/EditValidator'

export default {
  middleware: 'authenticated',

  components: {
    PageTemplate,
    StakingDelegate,
    StakingUnbond,
    StakingDelegations,
    StakingRedelegate,
    StakingEditValidator
  },
  head() {
    const title = `Staking ${this.address}`
    return {
      title: title,
      meta: [{ hid: 'og-title', name: 'og:title', content: title }]
    }
  },
  data() {
    return {
      loading: false,
      delegate: null,
      unbond: null,
      delegations: []
    }
  },
  created() {
    this.getDelegations()
  },
  methods: {
    async getDelegations() {
      try {
        this.loading = true
        const validators = await this.$btsg.getValidators()
        const delegations = await this.$btsg.getDelegations(this.address)

        this.delegations = delegations
          .sort((a, b) => {
            return b.shares - a.shares
          })
          .map(d => {
            const val = validators.result.find(
              v => v.operator_address === d.validator_address
            )
            return {
              ...d,
              validator_name: val !== undefined ? val.description.moniker : '',
              identity: val !== undefined ? val.description.identity : ''
            }
          })

        this.loading = false
      } catch (e) {
        console.error(e)
      }
    },
    onDelegate(valoper) {
      this.delegate = valoper
      this.unbond = null
      this.$vuetify.goTo('#delegate', {
        duration: 300,
        offset: 0,
        easing: 'easeInOutCubic'
      })
    },
    onUnbond(valoper) {
      this.delegate = null
      this.unbond = valoper
      this.$vuetify.goTo('#unbond', {
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
