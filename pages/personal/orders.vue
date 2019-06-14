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
        <!-- <div v-if="$route.query.filter_history == 'Y'">
            <h2 v-if="$route.query.show_canceled == 'Y'">Отменённые заказы</h2>
            <h2 v-else>История заказов</h2>
            <div class="orders__small s-orders">

                <div class="s-orders__item" v-for="(order, index) in orders" :key="index">
                    <div class="s-orders__header">
                        <div class="s-orders__name">
                            <b>Заказ № 38 ОТ 07.06.2019 09:31:42, 1 товар на сумму 5 469.50 руб.</b>
                        </div>
                        <div class="s-orders__info">
                            <p class="s-orders__canceled">Заказ отменен</p>
                            <p class="s-orders__date">07.06.2019</p>
                        </div>
                    </div>
                    <div class="s-orders__body p-20">
                        <nuxt-link class="s-orders__detail mr-auto" to="/personal/orders/1">Подробнее о заказе</nuxt-link>
                        <nuxt-link class="s-orders__repeat" to="#0">Повторить заказ</nuxt-link>
                    </div>
                </div>

            </div>
        </div> -->
        <div>
            <h2>Заказы в статусе «Принят, Ожидается оплата»</h2>
            <div class="orders__small s-orders" v-for="order in orders" :key="order.ORDER.ID">
                <current-order :order="order" />
            </div>
        </div>
    </div>
</div>
</template>

<script>
import CurrentOrder from '~/components/personal/CurrentOrder.vue'

export default {
    middleware: 'auth',
    components: {
        CurrentOrder,
    },
    watch: {
        '$route' (to, from) {
            this.$store.dispatch('order/LOAD_ORDERS', {'params':to.params, 'query':to.query}).then((response) => {
                if (response.copy) {
                    this.$store.dispatch('basket/STATE');
                    this.$router.push('/basket');
                }
            });
        },
    },
    async asyncData({ store, error, params, query }) {
        let response = await store.dispatch('order/LOAD_ORDERS', {'params':params, 'query':query})
        console.log(response)
        return {
            orders:response.orders
        }
    },
}
</script>


<style lang="scss">
.orders {
    margin-top: 40px;
    color: #4a4a4a;
    h2 {
        font-size: 20px;
        font-weight: 400;
        text-transform: uppercase;
        color: #000;
    }
    &__nav {
        a {
            display: inline-block;
            margin-right: 10px;
            color: #000;
        }
        + div {
            margin-top: 40px;
        }
    }
}
</style>
