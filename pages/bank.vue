<template>
  <page-template>
    <page-app-bar title="Bank"></page-app-bar>

    <bank-send></bank-send>
  </page-template>
</template>

<script>
import PageTemplate from '@/components/PageTemplate'
import BankSend from '@/components/Bank/Send'

export default {
  middleware: 'authenticated',
  components: {
    PageTemplate,
    BankSend
  },
  head() {
    const title = `Bank ${this.address}`
    return {
      title: title,
      meta: [{ hid: 'og-title', name: 'og:title', content: title }]
    }
  },
  computed: {
    address() {
      return this.$store.getters['wallet/address']
    }
  }
}
</script>
