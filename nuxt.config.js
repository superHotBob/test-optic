module.exports = {
  /*
  ** Headers of the page
  */
 server: {
    port: 3000, // default: 3000
    host: '0.0.0.0', // default: localhost
  },
  head: {
    title: 'Home-optic',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'demo bitrix' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    // script: [
    //   { src: 'https://vk.com/js/api/openapi.js?160' }
    // ],
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#007bff' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extractCSS: true,
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  modules: [
    '@nuxtjs/axios',
    '~/modules/routers',
    'bootstrap-vue/nuxt',
    ['vue-scrollto/nuxt', { duration: 1000 }],
  ],
  bootstrapVue: {
    bootstrapCSS: false, // Or `css: false`
    bootstrapVueCSS: false // Or `bvCSS: false`
  },
  axios: {
    proxy: true,
    baseURL: 'http://localhost:3000/',
    credentials: true
  },
  proxy: {
    // '/api/': 'http://14.esobolev.ru/',
    '/api/': 'http://home-optic.proj/',
  },
  cache: true,
  css: [
    '~/assets/styles/styles.scss',
    'swiper/dist/css/swiper.css'
  ],
  plugins: [
    '~/plugins/array',
    '~/plugins/axios',
    '~/plugins/cookie',
    { src: '~/plugins/lazyload', ssr: false },
    { src: '~/plugins/vuex-cache', ssr: false },
    { src: '~/plugins/swiper', ssr: false },
    { src: '~/plugins/vee-validate', ssr: true },
    { src: '~/plugins/mask', ssr: true },
  ],
}

