module.exports = {
  /*
  ** Headers of the page
  */
 server: {
    port: 3000, // default: 3000
    host: '0.0.0.0', // default: localhost
  },
  head: {
    title: 'demo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'demo bitrix' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css'}
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
    '~/modules/routers'
  ],
  axios: {
    proxy: true,
    baseURL: 'http://localhost:3000/',
    credentials: true
  },
  proxy: {
    '/api/': 'http://home-optic.proj',
  },
  cache: true,
  css: ['~/assets/css/main.css'],
  plugins: [
    '~/plugins/axios',
    '~/plugins/array',
    { src: '~/plugins/vue-masonry-css', ssr: true }
  ]
}

