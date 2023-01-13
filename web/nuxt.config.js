import axios from 'axios'
global.HTMLElement = typeof window === 'undefined' ? Object : window.HTMLElement
let dynamicRoutes = () => {
  return axios.get('https://crop-foundation.s3-us-west-2.amazonaws.com/app-data/production-events.json').then(res => {
    return res.data[0].events.map(event => `/events/${event.slug}`)
  })
 }

export default {
  mode: 'spa',
  router: {
    middleware: 'loader'
  },
  generate: {
    routes: dynamicRoutes
  },
  /*
   ** Headers of the page
   */
  head: {
    title: 'The Crop Foundation',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Welcome to The CROP Foundation - fostering educational and employment opportunities for innovative culinary students through unique culinary events. Help us cultivate the next generation of culinary superstars.' },
      { hid: 'og:description', property: 'og:description', content: 'Welcome to The CROP Foundation - fostering educational and employment opportunities for innovative culinary students through unique culinary events. Help us cultivate the next generation of culinary superstars.' },
      { hid: 'og:image', property: 'og:image', content: 'https://www.thecrop.org/og-image.png' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'The Crop Foundation' },
      { hid: 'og:title', property: 'og:title', content: 'The Crop Foundation' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'https://thecrop.org' },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
      { hid: 'twitter:description', name: 'twitter:description', content: 'Welcome to The CROP Foundation - fostering educational and employment opportunities for innovative culinary students through unique culinary events. Help us cultivate the next generation of culinary superstars.' },
      { hid: 'twitter:image', name: 'twitter:image', content: 'https://www.thecrop.org/og-image.png' },
      { hid: 'twitter:site', name: 'twitter:site', content: '@CropFoundation' },
      { hid: 'twitter:title', name: 'twitter:title', content: 'The Crop Foundation' },
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
    '~/plugins/appearable',
    { src: '~/plugins/infinite-loading', ssr: false },
    { src: '~/plugins/resize', ssr: false }
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
