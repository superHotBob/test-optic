module.exports = {
  /*
  ** Headers of the page
  */
//  target: 'static',
 
 server: {
    //port: 3000, // default: 3000
    host: '0.0.0.0', // default: localhost
  },
  head: {
    title: 'Home optic',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'demo bitrix 1' },
        { name: 'google-site-verification', content: 'yLBxge6Gk1eUUvdZKzeCg7jH3sY3ozOY8YMsi43emuY' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/upload/favicon1.ico' }
    ],
    script: [
      { src: 'https://www.googletagmanager.com/gtag/js?id=UA-153400664-1' },
      //{ src: '/js/googleanalitics.js' },
      //{ src: '/js/yandexmetrica.js' },
    ],
  },
  //serverMiddleware: ['~/myServerMiddleware/'],
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
    // ['vue-scrollto/nuxt', { duration: 1000 }],
    //   ['@nuxtjs/google-analytics', {
    //       id: 'UA-154459164-1'
    //   }],
      [
          '@nuxtjs/yandex-metrika',
          {
              id: '56402599',
              webvisor: true,
              // clickmap:true,
              // useCDN:false,
              trackLinks:true,
              // accurateTrackBounce:true,
          }
      ],
  ],
    buildModules: [
        ['@nuxtjs/google-analytics', {
            id: 'UA-154459164-1'
        }]
        ],
  bootstrapVue: {
    bootstrapCSS: false, // Or `css: false`
    bootstrapVueCSS: false // Or `bvCSS: false`
  },
  axios: {
    proxy: false,
    baseURL: 'https://home-optic.ru/',
//    baseURL: 'https://new.anthony.beget.tech/',
    credentials: true
  },
  // proxy: {
  //  '/api/': 'http://14.esobolev.ru/',
  //   // '/bitrix/': 'http://vosq.proj/',
  //   // '/api/': 'http://home-optic.proj/',
  // },
  cache: false,
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
    { src: '~/plugins/lightbox', ssr: false },
    { src: '~/plugins/vee-validate', ssr: true },
    { src: '~/plugins/mask', ssr: true },
    { src: '~plugins/ga.js', mode: 'client' },
    { src: '~plugins/vk.js', mode: 'client' },
    { src: '~plugins/callibri.js', mode: 'client' },
  ],
}

