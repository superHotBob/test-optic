<template>
<div class="cart main-container">
    <div class="cart__controls">
        <button :class="{'active': postponed == false}" @click="postponed = false">Товары в корзине (n)</button>
        <button :class="{'active': postponed == true}" @click="postponed = true">Отложенные товары (z)</button>
    </div>
    <div class="cart__heading">
        <b class="cart__info">Товары</b>
        <b class="cart__price">Цена</b>
        <b class="cart__discount" v-if="postponed">Скидка</b>
        <b class="cart__summ">Сумма</b>
        <b class="cart__actions">Количество</b>
    </div>
    <div class="cart__items" v-if="getBasket.GRID">
        <cart-item v-for="item in getBasket.GRID.ROWS" :key="item.ID" :item="item" :postponed="postponed"/>
    </div>
    <item-slider class="cart__slider" items="recommended"/>
</div>    
</template>

<script>
import basket from '~/mixins/basket/basket.js'

import CartItem from '~/components/cart/CartItem.vue'
import ItemSlider from '~/components/sliders/ItemSlider.vue'

export default {
    mixins: [basket],
    data() {
        return {
            postponed: false,
        }
    },
    components: {
        CartItem,
        ItemSlider,
    },
    computed: {

    },
    methods: {

    },
}
</script>
