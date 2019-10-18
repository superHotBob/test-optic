<template>
<div class="user-order__block">
    <div class="user-order__header">Параметры отгрузки</div>
    <div class="user-order__body" v-for="(delivery, index) in order.SHIPMENT" :key="index">
        <div class="user-order__info">
            <img :src="delivery.DELIVERY.SRC_LOGOTIP" alt="">
            <div>
                <p>
                    <b>Отгрузка №{{delivery.ACCOUNT_NUMBER}}, стоимость доставки {{delivery.PRICE_DELIVERY_FORMATED}}</b>
                </p>
                <p>Служба доставки: {{delivery.DELIVERY_NAME}}</p>
                <p>Статус отгрузки: {{delivery.STATUS_NAME}}</p>
            </div>
        </div>
        <div class="s-orders__payment mb-3">
            <div v-show="tabOpened == false">
                <button class="s-orders__change btn-simple mb-2" type="button" @click="tabOpened = true">показать все</button>
                <br>
            </div>
            <div v-show="tabOpened != false">
                <div class="cart__heading">
                    <b class="cart__info">Товары</b>
                    <b class="cart__price">Цена</b>
                    <b class="cart__discount">Скидка</b>
                    <b class="cart__summ">Сумма</b>
                    <b class="cart__actions">Количество</b>
                </div>
                <div class="cart__items">
                    <order-item v-for="(item, index) in delivery.ITEMS" :key="index" :item="getBasket(item.BASKET_ID)" />
                </div>
                <button class="btn-simple" type="button" @click="tabOpened = false">Свернуть</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import OrderItem from '~/components/personal/OrderItem.vue'

export default {
    props: ['order'],
    data() {
        return {
            tabOpened: false,
        }
    },
    methods: {
        getBasket(id) {
            return this.order.BASKET[id];
        }
    },
    components: {
        OrderItem,
    },
}
</script>
