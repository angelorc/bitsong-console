<template>
  <page-template>
    <page-app-bar title="Staking"></page-app-bar>

    <staking-delegate class="mb-8"></staking-delegate>

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

export default {
  components: {
    PageTemplate
  },
  data() {
    return {
      title: `Staking`,
      cards: [
        {
          title: 'Create Validator',
          subtitle:
            'Create new validator initialized with a self-delegation to it.'
        },
        {
          title: 'Edit Validator',
          subtitle: 'Edit an existing validator account.'
        },
        {
          title: 'Redelegate',
          subtitle: 'Redelegate illiquid tokens from one validator to another.'
        },
        { title: 'Unbond', subtitle: 'Unbond tokens from a validator.' }
      ]
    }
  }
}
</script>
