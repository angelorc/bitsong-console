<template>
  <v-dialog
    :fullscreen="$vuetify.breakpoint.smAndDown"
    :value="showModal"
    persistent
    max-width="400"
  >
    <slot />
  </v-dialog>
</template>

<script>
export default {
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
  }
}
</script>
