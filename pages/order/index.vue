<template>
<div>
    <basket/>
    <order/>
</div>
</template>

<script>

import Order from '~/components/order/Order.vue'
import Basket from '~/components/basket/Basket.vue'

export default {
    components: {
        Order,
        Basket 
    },
    head() {
        return {
            title: 'Оформление заказа'
        }
    }
}
</script>