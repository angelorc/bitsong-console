<template>
  <div class="text-center">
    <v-menu v-model="menu" :nudge-width="200" offset-overflow>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <Jdenticon v-if="$vuetify.breakpoint.mdAndUp" :address="address" />
          <v-icon v-else>
            mdi-account
          </v-icon>
        </v-btn>
      </template>

      <v-card width="300">
        <v-list style="background-color: #D11D27">
          <v-list-item two-line>
            <v-list-item-avatar>
              <Jdenticon :address="address" />
            </v-list-item-avatar>

            <v-list-item-content class="text-center">
              <v-list-item-title class="white--text font-weight-medium">
                {{ address }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon color="grey darken-1">{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-title v-text="item.title" />
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item @click="$vuetify.theme.dark = !$vuetify.theme.dark">
            <v-list-item-action>
              <v-icon color="grey darken-1">mdi-brightness-4</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Theme</v-list-item-title>
              <v-list-item-subtitle>dark</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-switch
                v-model="$store.getters['app/dark_theme']"
                @click="$store.dispatch('app/toggleDarkTheme')"
              ></v-switch>
            </v-list-item-action>
          </v-list-item>
          <v-list-item @click>
            <v-list-item-action>
              <v-icon color="grey darken-1">mdi-translate</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Language</v-list-item-title>
              <v-list-item-subtitle>English</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon color="grey darken-1">mdi-chevron-right</v-icon>
            </v-list-item-action>
          </v-list-item>
          <v-list-item to="#" router exact>
            <v-list-item-action>
              <v-icon color="grey darken-1">mdi-cog</v-icon>
            </v-list-item-action>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item>
          <v-list-item to="#" router exact>
            <v-list-item-action>
              <v-icon color="grey darken-1">mdi-help-circle</v-icon>
            </v-list-item-action>
            <v-list-item-title>Help</v-list-item-title>
          </v-list-item>
          <v-list-item to="#" router exact>
            <v-list-item-action>
              <v-icon color="grey darken-1">mdi-message-alert</v-icon>
            </v-list-item-action>
            <v-list-item-title>Send feedback</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import Jdenticon from '@/components/Jdenticon'

export default {
  components: {
    Jdenticon
  },
  data() {
    return {
      menu: false
    }
  },
  computed: {
    items() {
      return [
        {
          icon: 'mdi-exit-to-app',
          title: 'Log out',
          to: '/wallet/logout'
        }
      ]
    },
    address() {
      return this.$store.getters[`wallet/address`]
    }
  }
}
</script>

<style scoped>
.v-list-item__title,
.v-list-item__subtitle {
  white-space: normal;
}
</style>
