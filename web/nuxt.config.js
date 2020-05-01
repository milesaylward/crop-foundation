global.HTMLElement = typeof window === 'undefined' ? Object : window.HTMLElement

export default {
  mode: 'universal',
  router: {
    middleware: 'loader'
  },
  /*
   ** Headers of the page
   */
  head: {
    title: 'The Crop Foundation',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Welcome to The CROP Foundation - fostering educational and employment opportunities for innovative culinary sstudents through unique culinary events. Help us cultivate the next generation of culinary superstars.'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap'
      },
      { rel: 'stylesheet', href: 'https://use.typekit.net/fpi7axi.css' }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  styleResources: {
    // your settings here
    scss: ['~/assets/styles/prelude.scss']
  },

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/global',
    { src: '~/plugins/appearable', ssr: false },
    { src: '~plugins/infinite-loading', ssr: false }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/svg', '@nuxtjs/style-resources', '@nuxtjs/axios'],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
