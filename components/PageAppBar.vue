<template>
  <v-app-bar
    app
    color="red darken-1"
    dark
    fixed
    v-if="$vuetify.breakpoint.smAndDown"
  >
    <v-toolbar-title class="text-h5"> {{ title }} </v-toolbar-title>
    <v-spacer></v-spacer>
    <user-menu></user-menu>
  </v-app-bar>
</template>

<script>
export default {
  props: {
    title: String
  }
}
</script>
