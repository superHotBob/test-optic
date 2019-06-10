<template>
<div class="user-order__block">
    <div class="user-order__header">Параметры отгрузки</div>
    <div class="user-order__body">
        <div class="user-order__info">
            <img :src="info.system.img" alt="">
            <div>
                <p>
                    <b>Отгрузка №37/2, стоимость доставки {{info.system.cost}}</b>
                </p>
                <p>Служба доставки: {{info.system.name}}</p>
                <p>Статус отгрузки: {{info.status}}</p>
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
                    <order-item v-for="(item, index) in items" :key="index" :item="item" />
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
    props: ['info', 'items'],
    data() {
        return {
            tabOpened: false,
        }
    },
    components: {
        OrderItem,
    },
}
</script>
