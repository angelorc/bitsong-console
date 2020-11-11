<template>
  <v-footer dark padless>
    <v-container fluid>
      <v-row align-content="center" justify="center">
        <v-col cols="12" align-self="center" class="text-center">
          <v-img
            style="margin: 0 auto"
            max-height="30"
            max-width="30"
            src="/bitsong_logo_circle_red.svg"
          ></v-img>
          <h6 class="text-h6 font-weight-regular mb-2 mt-1">
            Powered by BitSong
          </h6>
          <p class="caption">
            BitSong Explorer is a Block Explorer and Analytics Platform for
            BitSong, a decentralized blockchain for the music industry.
          </p>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row class="pb-8 mb-4" justify="center">
        <v-col cols="12" md="3" class="pb-0">
          <p
            class="caption"
            :class="{
              'text-center': $vuetify.breakpoint.smAndDown,
            }"
          >
            BitSong Explorer &copy; {{ new Date().getFullYear() }}
          </p>
        </v-col>
        <v-col
          cols="12"
          md="3"
          :class="{
            'text-right': $vuetify.breakpoint.mdAndUp,
            'text-center pt-0': $vuetify.breakpoint.smAndDown,
          }"
        >
          <v-btn
            href="https://twitter.com/bitsongofficial"
            target="_blank"
            icon
            class="mx-2"
          >
            <v-icon>mdi-twitter</v-icon>
          </v-btn>
          <v-btn
            href="https://facebook.com/bitsongofficial"
            target="_blank"
            icon
            class="mx-2"
          >
            <v-icon>mdi-facebook</v-icon>
          </v-btn>
          <v-btn
            href="https://www.reddit.com/r/bitsong"
            target="_blank"
            icon
            class="mx-2"
          >
            <v-icon>mdi-reddit</v-icon>
          </v-btn>
          <v-btn
            href="https://discord.gg/mZC9Yk3"
            target="_blank"
            icon
            class="mx-2"
          >
            <v-icon>mdi-discord</v-icon>
          </v-btn>
          <v-btn
            href="https://medium.com/@BitSongOfficial"
            target="_blank"
            icon
            class="mx-2"
          >
            <v-icon>mdi-post-outline</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>
