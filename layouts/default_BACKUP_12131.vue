<template>
  <div>
    <log-out/>
    <login-form/>
    <div>
      <nuxt-link active-class="active" to="/" exact>Главная</nuxt-link>
      <nuxt-link active-class="active" :to="{ name: 'basket'}">Корзина</nuxt-link>
    </div>
    <div>
      <nuxt-link active-class="active" :to="{ name: 'section', params: { section: 'frames' }}">Оправы</nuxt-link>
      <nuxt-link active-class="active" :to="{ name: 'section', params: { section: 'rims' }}">Линзы для очков</nuxt-link>
    </div>
    <nuxt/>
  </div>
</template>

<script>


import LogOut from '~/components/user/ButtonLogout.vue'
import LoginForm from '~/components/user/LoginForm.vue'

export default {
  components: {
    LoginForm,
    LogOut,
  },
  computed: {
  },
}
</script>
