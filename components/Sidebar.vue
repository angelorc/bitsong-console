<template>
  <v-navigation-drawer
    :class="{ color: !$vuetify.theme.dark }"
    :value="$vuetify.breakpoint.mdAndUp ? true : sidebar"
    @input="$store.commit('app/SET_SIDEBAR', $event)"
    app
    :fixed="$vuetify.breakpoint.mdAndUp"
    :temporary="$vuetify.breakpoint.smAndDown"
    :stateless="$vuetify.breakpoint.mdAndUp"
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
        v-for="(item, i) in itemsEnabled"
        :key="i"
        :to="item.to"
        router
      >
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title
            :class="{ 'font-weight-medium': $vuetify.theme.dark }"
            v-text="item.title"
          />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  computed: {
    sidebar() {
      return this.$store.getters['app/sidebar']
    },
    logo() {
      return this.$vuetify.theme.dark
        ? `/bitsong_logo.svg`
        : `/bitsong_logo_red.svg`
    },
    items() {
      return [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/',
          enabled: true
        },
        { icon: 'mdi-account-key', title: 'Auth', to: '/auth', enabled: false },
        {
          icon: 'mdi-bank',
          title: 'Bank',
          to: '/bank',
          enabled: true
        },
        {
          icon: 'mdi-flash',
          title: 'Staking',
          to: '/staking',
          enabled: true
        },
        {
          icon: 'mdi-vote',
          title: 'Governance',
          to: '/governance',
          enabled: false
        },
        {
          icon: 'mdi-alert-decagram',
          title: 'Crisis',
          to: '/crisis',
          enabled: false
        },
        {
          icon: 'mdi-diamond-stone',
          title: 'Distribution',
          to: '/distribution',
          enabled: false
        },
        {
          icon: 'mdi-close-octagon',
          title: 'Slashing',
          to: '/slashing',
          enabled: false
        }
      ]
    },
    itemsEnabled() {
      return this.items.filter(i => i.enabled)
    }
  }
}
</script>
