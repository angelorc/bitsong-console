import pkg from './package.json'
import colors from 'vuetify/es5/util/colors'
require('dotenv').config()

export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: "static",

  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: titleChunk => {
      return titleChunk ? `${titleChunk} | ${process.env.SHORT_TITLE}` : `${process.env.SHORT_TITLE}`;
    },
    title: '',
    meta: [
      { charset: 'utf-8' },
      { name: 'author', content: 'BitSong Team' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.SEO_DESCRIPTION },
      { name: 'keywords', content: 'bitsong, explorer, block explorer, btsg, cosmos, atom, validators, staking, search, blockchain, crypto, currency, analytics' },
      { name: 'format-detection', content: 'telephone=no' },
      { hid: 'og:title', name: 'og:title', content: process.env.SEO_TITLE },
      { property: 'og:description', content: process.env.SEO_DESCRIPTION },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: process.env.SEO_TITLE },
      { property: 'og:url', content: process.env.SEO_URL },
      { property: 'og:image', content: process.env.SEO_IMAGE },
      { property: 'og:image:alt', content: process.env.SEO_IMAGE_ALT },
      { property: 'twitter:card', content: 'summary' },
      { property: 'twitter:title', content: process.env.SEO_TITLE },
      { property: 'twitter:description', content: process.env.SEO_DESCRIPTION },
      { property: 'twitter:site', content: process.env.SEO_TWITTER_HANDLE },
      { property: 'twitter:image', content: process.env.SEO_IMAGE },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;600;700;800&display=swap"
      }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  env: {
    WORKBOX_DEBUG: process.env.WORKBOX_DEBUG ? process.env.WORKBOX_DEBUG : false,
    SHORT_TITLE: process.env.SHORT_TITLE ? process.env.SHORT_TITLE : `BitSong Console`,
    API: process.env.API ? process.env.API : `http://localhost:3001/api/v1`,
    EXPLORER_URL: process.env.EXPLORER_URL ? process.env.EXPLORER_URL : `https://explorebitsong.com`,

    GA_ID: process.env.GA_ID ? process.env.GA_ID : ``,
    SEO_TITLE: process.env.SEO_TITLE ? process.env.SEO_TITLE : `BitSong (BTSG) Blockchain Console`,
    SEO_DESCRIPTION: process.env.SEO_DESCRIPTION ? process.env.SEO_DESCRIPTION : `BitSong Console allows you to interact with the BitSing blockchain in a simple and immediate way. Try the bank, staking, governane, auth and crisis`,
    SEO_URL: process.env.SEO_URL ? process.env.SEO_URL : `http://localhost:3000/`,
    SEO_IMAGE: process.env.SEO_IMAGE ? process.env.SEO_IMAGE : `http://localhost:3000/bitsong_logo_circle_red.png`,
    SEO_IMAGE_ALT: process.env.SEO_IMAGE_ALT ? process.env.SEO_IMAGE_ALT : `Visit localhost:3000`,
    SEO_TWITTER_HANDLE: process.env.SEO_TWITTER_HANDLE ? process.env.SEO_TWITTER_HANDLE : `@bitsongofficial`,

    STAKEDENOM: process.env.STAKEDENOM ? process.env.STAKEDENOM : `btsg`,
    MICROSTAKEDENOM: process.env.MICROSTAKEDENOM ? process.env.MICROSTAKEDENOM : `ubtsg`,
    LCD: process.env.LCD ? process.env.LCD : `http://localhost:1317`,
    RPC: process.env.RPC ? process.env.RPC : `http://localhost:26657`,
    SOCKET: process.env.SOCKET ? process.env.SOCKET : `http://localhost:26657/websocket`,
    CHAIN_ID: process.env.CHAIN_ID ? process.env.CHAIN_ID : `bitsong-localnet`,
    DEFAULT_GAS_PRICE: process.env.DEFAULT_GAS_PRICE ? process.env.DEFAULT_GAS_PRICE : 0.025,
    DEFAULT_GAS_LIMIT: process.env.DEFAULT_GAS_LIMIT ? process.env.DEFAULT_GAS_LIMIT : 200000,
    ADDRESS_PREFIX: process.env.ADDRESS_PREFIX ? process.env.ADDRESS_PREFIX : `bitsong`,
    ADDRESS_LENGTH: process.env.ADDRESS_LENGTH ? process.env.ADDRESS_LENGTH : 46,
    ADDRESS_START_REGEX: process.env.ADDRESS_START_REGEX ? process.env.ADDRESS_START_REGEX : /^bitsong1/,
    HD_PATH: process.env.HD_PATH ? process.env.HD_PATH : `44'/639'/0'/0/`,
    DECIMALS: process.env.DECIMALS ? process.env.DECIMALS : 6,
    SIGN_MODE_TYPE: process.env.SIGN_MODE_TYPE ? process.env.SIGN_MODE_TYPE : 'block'
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [{
    src: "~/plugins/app.js",
    ssr: false
  }, {
    src: "~/plugins/seo-gtag.js",
    ssr: false
  }],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/dotenv'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/proxy',
    "nuxt-validate",
    [
      "nuxt-vuex-localstorage",
      {
        localStorage: ["settings", "wallet"],
        sessionStorage: ["app"]
      }
    ]
  ],

  pwa: {
    manifest: {
      name: process.env.SEO_TITLE ? process.env.SEO_TITLE : `BitSong (BTSG) Blockchain Console`,
      short_name: process.env.SHORT_TITLE ? process.env.SHORT_TITLE : `BitSong Console`,
      theme_color: "#37474F",
      description: process.env.SEO_DESCRIPTION ? process.env.SEO_DESCRIPTION : `BitSong Console allows you to interact with the BitSing blockchain in a simple and immediate way. Try the bank, staking, governane, auth and crisis`,
      background_color: "#F4F4F4",
      display: "standalone",
      start_url: "/",
      lang: 'en'
    },
    workbox: {
      //dev: process.env.WORKBOX_DEBUG,
      enabled: true,
      config: { debug: process.env.WORKBOX_DEBUG },

      // importScripts: [
      //   '/offline-sw.js',
      // ],

      cleanupOutdatedCaches: true,

      /*preCaching: [
        'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;600;700;800&display=swap'
        'https://fonts.googleapis.com/css?family=Material+Icons',
      ],*/

      cacheNames: {
        suffix: pkg.version
      },
      cacheOptions: {
        cacheId: pkg.name,
        revision: pkg.version
      },

      // Runtime caching caches pages as we browse
      runtimeCaching: [
        // {
        //   urlPattern: '/.*',
        //   handler: 'networkFirst',
        //   method: 'GET',
        //   strategyOptions: {
        //     cacheExpiration: {
        //       maxEntries: 10,
        //       maxAgeSeconds: 60 * 60 * 24 * 1, // 1 day
        //       purgeOnQuotaError: true,
        //     }
        //   },
        // },

        // Cache fonts
        {
          urlPattern: 'https://fonts.googleapis.com',
          handler: 'NetworkFirst',
          method: 'GET',
          strategyOptions: {
            cacheName: 'assets',
            cacheExpiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 1, // ( 1 day ) 1 year
              purgeOnQuotaError: true,
            }
          },
        },
        {
          urlPattern: 'https://fonts.gstatic.com',
          handler: 'StaleWhileRevalidate',
          method: 'GET',
          strategyOptions: {
            cacheName: 'assets',
            /*cacheableResponse: {
              statuses: [ 200 ],
            },*/
            cacheExpiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 1, // ( 1 day ) 1 year
              purgeOnQuotaError: true,
            }
          },
        },

        // Cache Amazon S3
        {
          urlPattern: 'https://s3.amazonaws.com',
          handler: 'StaleWhileRevalidate',
          method: 'GET',
          strategyOptions: {
            cacheName: 'assets',
            cacheExpiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 1, // ( 1 day ) 1 year
              purgeOnQuotaError: true,
            }
          },
        },

        // Cache basic API responses
        // {
        //   urlPattern: process.env.LCD,
        //   handler: 'NetworkFirst',
        //   method: 'GET',
        //   strategyOptions: {
        //     cacheName: 'bitsong-lcd',
        //   },
        // },
      ],

      // Automatically cache for offline usage
      offlineAssets: [
        // Route Locations
        /*
        '/',
        '/bank',
        '/staking',
        */

        // Assets
        '/bitsong_logo_circle_red.svg',
        '/bitsong_logo_red.svg',
        '/bitsong_logo.svg',
        'https://fonts.googleapis.com/css?family=Material+Icons',
      ],
    }
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    proxy: false
  },

  proxy: {
    '/lcd': {
      target: process.env.LCD,
      pathRewrite: {
        '^/lcd': '/'
      }
    }
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: false,
    theme: {
      dark: false,
      themes: {
        light: {
          //primary: colors.red.darken1,
        },
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    //analyze: true,
    //extractCSS: true,
    extend(config, ctx) {
      config.node = {
        fs: "empty"
      };
      // // Optimisation
      // if (ctx && ctx.isClient) {
      //   config.optimization.splitChunks.maxSize = 100000
      // }

      // // The below solution is taken from
      // // https://github.com/visualfanatic/vue-svg-loader/issues/75#issuecomment-468342586
      // // This sollution allows optional inlining of the SVG markup with vue-svg-loader with an
      // // ?inline query. Otherwise, normal url-loader behaviour occurs
      // const svgRule = config.module.rules.find((rule) => rule.test.test('.svg'))

      // // Overwrite the test regex (remove .svg file extension)
      // svgRule.test = /\.(png|jpe?g|gif|webp)$/i

      // config.module.rules.push({
      //   test: /\.(svg|svgz)(\?.+)?$/,
      //   oneOf: [
      //     {
      //       loader: 'vue-svg-loader',
      //       resourceQuery: /inline/
      //     },
      //     // Add original url-loader config to resolve every other svg without inline query
      //     svgRule.use[0]
      //   ]
      // })
    }
  }
}
