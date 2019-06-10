<template>
<div class="user-order__block">
    <div class="user-order__header">Содержимое заказа</div>
    <div class="user-order__body">
        <div class="s-orders__payment mb-3">
            <div class="cart__heading">
                <b class="cart__info">Товары</b>
                <b class="cart__price">Цена</b>
                <b class="cart__discount">Скидка</b>
                <b class="cart__summ">Сумма</b>
                <b class="cart__actions">Количество</b>
            </div>
            <div class="cart__items">
                <order-item v-for="(item, index) in items" :key="index" :item="item" />
            </div>
        </div>
    </div>
</div>
</template>

<script>
import OrderItem from '~/components/personal/OrderItem.vue'

export default {
    props: ['info', 'items'],
    components: {
        OrderItem,
    },
}
</script>
