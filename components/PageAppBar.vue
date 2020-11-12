<template>
  <div>
    <v-app-bar
      color="transparent"
      flat
      app
      fixed
      v-if="$vuetify.breakpoint.smAndDown"
    >
      <v-app-bar-nav-icon
        @click.stop="$store.commit('app/SET_SIDEBAR', true)"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="text-h5"> {{ title }} </v-toolbar-title>
      <v-spacer></v-spacer>
      <user-menu></user-menu>
    </v-app-bar>
    <v-divider v-if="$vuetify.breakpoint.smAndDown"></v-divider>
    <h1 v-else class="mb-8">{{ title }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    title: String
  }
}
</script>
