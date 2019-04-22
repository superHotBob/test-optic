<template>
    <div>
        <basket/>
        <nuxt-link active-class="active" :to="{ name: 'order'}">Оформить заказ</nuxt-link>
    </div>
</template>

<script>

import Basket from '~/components/basket/Basket.vue'

export default {
    components: {
        Basket 
    },
    head() {
        return {
            title: 'Корзина'
        }
    }
}
</script>
