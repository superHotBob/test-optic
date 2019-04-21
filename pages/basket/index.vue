<template>
    <div>
        <basket/>
        <nuxt-link active-class="active" to="/order" exact>Оформить заказ</nuxt-link>
    </div>
</template>

<script>

import Basket from '~/components/basket/Basket.vue'

export default {
    components: {
        Basket
    }
}
</script>

<style>

</style>
