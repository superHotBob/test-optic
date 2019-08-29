<template>
<div>
    <div class="content-header">
        <div class="main-container">
            <h2>Оформление заказа</h2>
            <ul class="breadcrumbs">
                <li><nuxt-link to="/">Главная</nuxt-link></li>
            </ul>
        </div>
    </div>
    <div class="order main-container" v-if="!orderId">
        <form ref="form">
            <input type="hidden" name="sessid" :value="getSessid">
            <input type="hidden" name="BUYER_STORE" value="0">
            <div role="tablist">
                <order-items />
                <person-type v-if="getBasket.COUPON_LIST" :personType="order.PERSON_TYPE" :promocode="getBasket.COUPON_LIST"/>
                <delivery v-if="getBasket.COUPON_LIST" :delivery="order.DELIVERY" :promocode="getBasket.COUPON_LIST" />
                <pay-system v-if="getBasket.COUPON_LIST" class="order__pay-system" :paysystem="order.PAY_SYSTEM" :promocode="getBasket.COUPON_LIST" />
                <properties />
            </div>
            <div class="order__submit hidden-mobile">
                <button type="button" class="button black mt-3" v-on:click="save">Оформить заказ</button>
            </div>
        </form>
        <div class="order__total total">
            <div class="total__row">
                <div>
                    Товаров на:
                </div>
                <div class="total__value" v-if="getOrder.TOTAL">
                    <p>{{getOrder.TOTAL.ORDER_PRICE_FORMATED}}</p>
                    <p v-if="getOrder.TOTAL.DISCOUNT_PRICE > 0">{{getOrder.TOTAL.PRICE_WITHOUT_DISCOUNT}}</p>
                </div>
            </div>
            <div class="total__row">
                <div>
                    Доставка:
                </div>
                <div class="total__value" v-if="getOrder.TOTAL">
                    <p>{{getOrder.TOTAL.DELIVERY_PRICE_FORMATED}}</p>
                </div>
            </div>
            <div class="total__row" v-if="getOrder.TOTAL && getOrder.TOTAL.DISCOUNT_PRICE > 0">
                <div>
                    Экономия:
                </div>
                <div class="total__value" v-if="getOrder.TOTAL">
                    <p>{{getOrder.TOTAL.DISCOUNT_PRICE_FORMATED}}</p>
                </div>
            </div>
            <div class="total__row total__row--total">
                <div>
                    Итого:
                </div>
                <div class="total__value" v-if="getOrder.TOTAL">
                    <p>{{getOrder.TOTAL.ORDER_TOTAL_PRICE_FORMATED}}</p>
                </div>
            </div>
        </div>
        <div class="order__submit hidden-desktop">
            <button type="button" class="button black mt-3" v-on:click="save">Оформить заказ</button>
        </div>
    </div>
    <div id="compile" >
        <div v-if="orderId" class="custom-page main-container" >
            <p class="big-text-bold">Ваш заказ №{{orderId}} успешно создан.</p>
            <p>Вы можете следить за выполнением своего заказа в <nuxt-link to="/personal/orders" style="color: #000">Персональном разделе сайта</nuxt-link>. Обратите внимание, что для входа в этот раздел вам необходимо будет ввести логин и пароль пользователя сайта.</p>
        </div>
    </div>
   
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import OrderItems from '~/components/order/OrderItems.vue'
import PaySystem from '~/components/order/PaySystem.vue'
import Delivery from '~/components/order/Delivery.vue'
import PersonType from '~/components/order/PersonType.vue'
import Properties from '~/components/order/Properties.vue'

import basket from '~/mixins/basket/basket.js'
import BasketItem from '~/components/basket/BasketItem.vue'

export default {
    mixins: [basket],
    components: {
        OrderItems,
        PaySystem,
        Delivery,
        PersonType,
        Properties,
        BasketItem
    },
    data() {
        return {
            orderId: false,
        }
    },
    methods: {
        getFormData() {
            let form = new FormData(this.$refs.form), 
                formData = {};

            for (let [key, value] of form.entries()) { 
                formData[key] = value;
            }

            return formData;
        },
        async save() {
            if (!this.isEmptyBasket) {
                var payload, order = {
                    'soa-action':'saveOrderAjax',
                }

                payload = Object.assign(this.getFormData(),order);

                let result = await this.$store.dispatch(
                    'order/request', 
                    payload
                );
                
                if (result.hasOwnProperty('ERROR'))
                    return;
                
                if (!this.isLogged)
                    this.$store.dispatch('user/STATE');

                this.orderId = result.order.ID;

                if (this.orderId) {
                    this.$root.$emit('order');
                }
                    
            } 
        },
        async refresh() {
            this.$store.dispatch(
                'order/request', 
                {
                    'order':this.getFormData(),
                    'soa-action':'refreshOrderAjax',
                    'sessid':this.getSessid,
                    'via_ajax':'Y',
                }
            );
        },
    },
    mounted() {
        this.$root.$on('refresh', value => { 
            this.refresh();
        })
    },
    computed: {
        ...mapGetters({
            getSessid: 'order/getSessid',
            getOrder: 'order/getOrder',
            // getPrice: 'order/getTotalPrice',
            isEmptyBasket: 'order/isEmptyBasket',
            isLogged: 'user/isLogged'
        }),
        order() {
            return this.getOrder;
        },
    },
}
</script>

<style lang="scss">
.order-error {
    padding: 8px 10px;
}
</style>