<template>
  <v-navigation-drawer
    style="background-color: #D11D27"
    :value="true"
    app
    dark
    clipped
    fixed
    stateless
    floating
    id="sidebar"
  >
    <v-container>
      <v-row no-gutters>
        <v-col>
          <img src="/bitsong_logo.svg" height="38" class="pt-1" />
        </v-col>
      </v-row>
    </v-container>
    <v-divider></v-divider>
    <v-list>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :to="item.to"
        router
        class="pl-7"
      >
        <v-list-item-action>
          <v-icon color="white">{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  computed: {
    items() {
      return [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-bank',
          title: 'Bank',
          to: '/bank'
        },
        {
          icon: 'mdi-flash',
          title: 'Staking',
          to: '/staking'
        },
        { icon: 'mdi-vote', title: 'Governance', to: '/governance' },
        {
          icon: 'mdi-logout',
          title: 'Logout',
          to: '/logout'
        }
      ]
    }
  }
}
</script>

<style lang="sass">
#sidebar
  .v-list .v-list-item--active .v-icon
    color: #E53935
</style>
