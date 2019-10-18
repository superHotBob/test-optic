<template>
<div class="s-orders__item">
    <div class="s-orders__header">
        <div class="s-orders__name">
            <b>Заказ № {{order.ORDER.ACCOUNT_NUMBER}} ОТ {{order.ORDER.DATE_INSERT_FORMATED}}, {{order.count_basket}} на сумму {{order.ORDER.FORMATED_PRICE}}</b>
        </div>
    </div>
    <div class="s-orders__body">
        <div class="s-orders__sub-header">
            <span>Оплата</span>
            <i></i>
        </div>

        <div v-for="(payment, index) in order.PAYMENT" :key="index">
            <div class="s-orders__heading" >
                <p>Счет {{payment.ACCOUNT_NUMBER}} от {{payment.DATE_BILL}}, {{payment.PAY_SYSTEM_NAME}}</p>
                <span class="s-orders__status green" v-if="payment.PAID === 'Y'">Оплачено</span>
                <span class="s-orders__status green" v-else-if="order.ORDER.IS_ALLOW_PAY == 'N'">На проверке менеджером</span>
                <span class="s-orders__status red" v-else>Не оплачено</span>
            </div>
            <p class="s-orders__data">Сумма к оплате по счету: {{payment.FORMATED_SUM}}</p>
            <div class="s-orders__payment" v-if="payment.PAID === 'N' && payment.IS_CASH !== 'Y'">
                <div>
                    <button class="s-orders__change btn-simple mb-2" type="button" @click="changePayment(order.ORDER.ACCOUNT_NUMBER, payment.ACCOUNT_NUMBER)">Сменить способ оплаты</button>
                    <br>
                    <button v-if="payment.PAY_SYSTEM_ID != 3" class="button black" type="button" @click="toPay(order.ORDER.ACCOUNT_NUMBER, payment.ACCOUNT_NUMBER)">Оплатить</button>
                </div>
                <div v-if="payment_list">
                    <div class="s-orders__payment-wrapper">
                        
                        <label class="o-radio o-radio--img" v-for="(item, index) in payment_list" :key="index">
                            <input name="PAY_SYSTEM_ID" type="radio" @click="changeToPay(order.ORDER.ACCOUNT_NUMBER, payment.ACCOUNT_NUMBER, item.ID)">
                            <img :src="item.LOGOTIP" alt="">
                            <span>{{item.PSA_NAME}}</span>
                            <div class="o-radio__border"></div>
                        </label>
                    </div>
                    <button class="btn-simple" type="button" @click="prev">Назад</button>
                </div>
            </div>
        </div>

        <div class="s-orders__sub-header mt-3">
            <span>Доставка</span>
            <i></i>
        </div>
        <div v-for="delivery in order.SHIPMENT" :key="delivery.ID">
            <div class="s-orders__heading">
                <p>Отгрузка	№{{delivery.ACCOUNT_NUMBER}}, стоимость доставки {{delivery.FORMATED_DELIVERY_PRICE}}</p>
                <span v-if="delivery.DEDUCTED == 'Y'" class="s-orders__status green">Отгружено</span>
                <span v-else class="s-orders__status red">Не отгружено</span>
            </div>
            <p class="s-orders__data">Статус отгрузки: <span class="s-orders__status">{{delivery.DELIVERY_STATUS_NAME}}</span></p>
            <p class="s-orders__data">Служба доставки: {{delivery.DELIVERY_NAME}}</p>

            <div class="s-orders__sub-header mt-3">
                <i></i>
            </div>
        </div>
        <div class="s-orders__buttons">
            <nuxt-link class="s-orders__detail mr-4" :to="'/personal/orders/' + order.ORDER.ID">Подробнее о заказе</nuxt-link>
            <nuxt-link class="s-orders__repeat mr-3" :to="'?COPY_ORDER=Y&ID=' + order.ORDER.ID">Повторить заказ</nuxt-link>
            <nuxt-link class="s-orders__cancel" to="#0">Отменить заказ</nuxt-link>
        </div>
    </div>
</div>
</template>

<script>

import qs from 'qs';
import { mapGetters } from 'vuex'

export default {
    props: ['order'],
    data() {
        return {
            payment_list: false,
            paymentTab: false,
        }
    },
    computed: {
        ...mapGetters({
            sessid: 'user/getSessid',
        })
    },
    methods: {
        changeToPay(order_id, payment_id, payment) {
            
            var params = {
                'orderData[order]':order_id,
                'orderData[payment]':payment_id,
                'orderData[paySystemId]':payment,
                'orderData[allow_inner]':'N',
                'orderData[refresh_prices]':'N',
                'orderData[only_inner_full]':'Y',
                'sessid':this.sessid
            }

            this.$axios.post(`/api/v1/changepayment/`, qs.stringify(params)).then(response => {

                var payment = window.open(``, 'Оплата', 'width=600,height=400');

                payment.onload = function() {

                    // создать div в документе нового окна
                    var div = payment.document.createElement('div'),
                        body = payment.document.body;

                    div.innerHTML = response.data

                    // вставить первым элементом в body нового окна
                    body.insertBefore(div, body.firstChild);
                }
            });

            
        },

        prev() {
            this.payment_list = false;
        },

        toPay(order_id, payment_id) {
            var payment = window.open(`/api/v1/payment/?ORDER_ID=${order_id}&PAYMENT_ID=${payment_id}`, 'Оплата', 'width=600,height=400');
        },

        changePayment(order_id, payment_id) {

            var params = {
                'orderData[order]':order_id,
                'orderData[payment]':payment_id,
                'orderData[allow_inner]':'N',
                'orderData[refresh_prices]':'N',
                'orderData[only_inner_full]':'Y',
                'sessid':this.sessid
            }

            this.$axios.post(`/api/v1/changepayment/`, qs.stringify(params)).then(response => {
                if (response.data.PAYSYSTEMS_LIST)
                    this.payment_list = response.data.PAYSYSTEMS_LIST;
            });
        }
    }
}
</script>
