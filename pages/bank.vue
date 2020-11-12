<template>
  <page-template>
    <page-app-bar :title="title"></page-app-bar>

    <bank-send></bank-send>
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
      title: `Bank`
    }
  }
}
</script>
