<template>
  <page-template>
    <page-app-bar title="Staking"></page-app-bar>

    <staking-delegations
      class="mb-8"
      v-on:delegate="onDelegate"
      v-on:unbond="onUnbond"
    />

    <staking-delegate
      id="delegate"
      v-model="delegate"
      class="mb-8"
    ></staking-delegate>

    <staking-unbond id="unbond" v-model="unbond" class="mb-8"></staking-unbond>

    <staking-redelegate class="mb-8"></staking-redelegate>

    <staking-create-validator
      v-if="false"
      class="mb-8"
    ></staking-create-validator>

    <card-msg
      v-if="false"
      v-for="(card, i) in cards"
      :key="i"
      :title="card.title"
      :subtitle="card.subtitle"
      class="mb-8"
    >
      <template v-slot:fields> </template>

      <template v-slot:actions> </template>

      <template v-slot:dialog> </template>
    </card-msg>
  </page-template>
</template>

<script>
import PageTemplate from '@/components/PageTemplate'
import StakingDelegations from '@/components/Staking/Delegations'
import StakingDelegate from '@/components/Staking/Delegate'
import StakingUnbond from '@/components/Staking/Unbond'
import StakingRedelegate from '@/components/Staking/Redelegate'
import StakingCreateValidator from '@/components/Staking/CreateValidator'

export default {
  middleware: 'authenticated',

  components: {
    PageTemplate,
    StakingDelegate,
    StakingUnbond,
    StakingDelegations,
    StakingRedelegate,
    StakingCreateValidator
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
      cards: [
        {
          title: 'Edit Validator',
          subtitle: 'Edit an existing validator account.'
        }
      ],
      delegate: null,
      unbond: null
    }
  },
  methods: {
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
