<template> </template>
<script>
export default {
  created() {
    this.$store.dispatch(`wallet/disconnect`)
    this.$router.push('/')
  }
}
</script>
