<template>
<div>
    <div class="content-header">
        <div class="main-container">
            <h2>Мои заказы</h2>
            <ul class="breadcrumbs">
                <li><nuxt-link to="/">Главная</nuxt-link></li>
                <li><nuxt-link to="/personal">Мой кабинет</nuxt-link></li>
            </ul>
        </div>
    </div>
    <div class="orders main-container">
        <div class="orders__nav">
            <nuxt-link v-if="$route.query.filter_history == 'Y'" to="/personal/orders">
                <span>Показать текущие заказы</span>
            </nuxt-link>
            <nuxt-link v-if="$route.query.show_canceled == 'Y' || ($route.query.filter_history != 'Y' && $route.query.show_canceled != 'Y')" :to="{query: { filter_history: 'Y' }}">
                <span>Посмотреть историю заказов</span>
            </nuxt-link>
            <nuxt-link v-if="$route.query.filter_history == 'Y' && $route.query.show_canceled != 'Y'" :to="{query: { filter_history: 'Y', show_canceled: 'Y' }}">
                <span>Посмотреть историю отмененных заказов</span>
            </nuxt-link>
        </div>
    </div>
</div>
</template>

<script>
export default {
  middleware: 'auth'
}
</script>