<template>
  <page-template>
    <page-app-bar title="Auth"></page-app-bar>

    <auth-sign></auth-sign>
  </page-template>
</template>

<script>
import PageTemplate from '@/components/PageTemplate'
import AuthSign from '@/components/Auth/Sign'

export default {
  components: {
    PageTemplate,
    AuthSign
  },

  head() {
    const title = `Auth ${this.address}`
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
