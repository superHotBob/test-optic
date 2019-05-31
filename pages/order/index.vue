<template>
<div>
    <order />
</div>
</template>

<script>

import Order from '~/components/order/Order.vue'

export default {
    components: {
        Order,
    },
    head() {
        return {
            title: 'Оформление заказа'
        }
    }
}
</script>
