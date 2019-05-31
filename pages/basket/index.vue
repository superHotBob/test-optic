<template>
<div>
    <basket />
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
