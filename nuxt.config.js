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
    ]
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
    extractCSS: false,
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
    '~/modules/routers'
  ],
  axios: {
    proxy: true,
    baseURL: 'http://localhost:3000/',
    credentials: true
  },
  proxy: {
    '/api/': 'http://14.esobolev.ru/',
  },
  cache: false,
  css: [
    '~/assets/styles/styles.scss',
    'swiper/dist/css/swiper.css'
  ],
  plugins: [
    '~/plugins/axios',
    '~/plugins/array',
    { src: '~/plugins/swiper.js', ssr: false },
    { src: '~/plugins/vue-masonry-css', ssr: true }
  ]
}

