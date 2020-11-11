<template>
  <v-navigation-drawer
    :class="{'color': !$vuetify.theme.dark}"
    :value="true"
    app
    fixed
    stateless
    id="sidebar"
  >
    <v-container>
      <v-row no-gutters>
        <v-col>
          <img :src="logo" height="38" class="pt-1" />
        </v-col>
      </v-row>
    </v-container>
    <v-list rounded>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :to="item.to"
        router
        >
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title :class="{'font-weight-medium': $vuetify.theme.dark}" v-text="item.title" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  computed: {
    logo() {
      return this.$vuetify.theme.dark ? `/bitsong_logo.svg` : `/bitsong_logo_red.svg`
    },
    items() {
      return [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/'
        },
        { icon: 'mdi-account-key', title: 'Auth', to: '/auth'},
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
        { icon: 'mdi-alert-decagram', title: 'Crisis', to: '/crisis' },
        { icon: 'mdi-diamond-stone', title: 'Distribution', to: '/distribution' },
        { icon: 'mdi-close-octagon', title: 'Slashing', to: '/slashing' },
      ]
    }
  }
}
</script>

<style lang="sass" scoped>
#sidebar
  .v-list .v-list-item--active .v-icon
    color: #E53935
  &.color
    background-color: #fafafa
</style>
