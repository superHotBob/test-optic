<template>
  <div>
    <log-out/>
    <login-form/>
    <basket/>
    <order/>
    <div>
      <nuxt-link active-class="active" to="/" exact>Главная</nuxt-link>
    </div>
    <div>
      <nuxt-link active-class="active" :to="{ name: 'section', params: { section: 'frames' }}">Оправы</nuxt-link>
      <nuxt-link active-class="active" :to="{ name: 'section', params: { section: 'rims' }}">Линзы для очков</nuxt-link>
    </div>
    <nuxt/>
  </div>
</template>

<script>

import Basket from '~/components/basket/Basket.vue'
import LogOut from '~/components/user/ButtonLogout.vue'
import LoginForm from '~/components/user/LoginForm.vue'
import Order from '~/components/order/Order.vue'

export default {
  components: {
    Basket,
    LoginForm,
    LogOut,
    Order
  },
  computed: {
  },
}
</script>
