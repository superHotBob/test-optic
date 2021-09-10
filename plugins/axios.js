import { cacheAdapterEnhancer } from 'axios-extensions'
import LRUCache from 'lru-cache'

const ONE_HOUR = 1000*60*60
const defaultCache = new LRUCache({ maxAge: ONE_HOUR })

export default function ({ $axios }) {

  const defaults = $axios.defaults
  defaults.adapter = cacheAdapterEnhancer(defaults.adapter, { enabledByDefault: false })

  $axios.onRequest(config => {
  // console.log('Making request to ' + config.url);
  })

  $axios.onResponse(res => {
  // console.log(res.headers);
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status);
  //  console.log(error);
    if (code === 400) {
      redirect('/400')
    }
  })
}