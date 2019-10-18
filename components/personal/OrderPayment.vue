<template>
<div class="user-order__block">
    <div class="user-order__header">Параметры оплаты</div>
    <div class="user-order__body">
        <div class="user-order__heading">
            <div class="user-order__payment-icon"></div>
            <div>
                <p>Заказ №{{order.ACCOUNT_NUMBER}} от {{order.DATE_INSERT_FORMATED}}, {{order.STATUS.NAME}}</p>
                <p>Сумма заказа: {{order.PRICE_FORMATED}}</p>
            </div>
        </div>
        <template  v-for="(payment, index) in order.PAYMENT">
            <div class="user-order__info"  :key="index">
                <img :src="order.PAY_SYSTEM.SRC_LOGOTIP" alt="">
                <div>
                    <p>
                        <b>Счет №{{payment.ACCOUNT_NUMBER}} от {{payment.DATE_BILL}}, {{order.NAME}}</b>
                        <span class="s-orders__status green" v-if="order.PAYED === 'Y'">Оплачено</span>
                        <span class="s-orders__status red" v-else>Не оплачено</span>
                    </p>
                    <p>Сумма к оплате по счету: {{order.PRICE_FORMATED}}</p>
                </div>
            </div>
            <div :key="payment.ACCOUNT_NUMBER" class="s-orders__payment mb-3">
                <div v-show="payment_list == false && order.PAYED !== 'Y'">
                    <button 
                        class="s-orders__change btn-simple mb-2" 
                        type="button" 
                        @click="changePayment(order.ACCOUNT_NUMBER, payment.ACCOUNT_NUMBER)"
                    >
                        Сменить способ оплаты
                    </button>
                    <br>
                    <button class="button black bold" type="button" @click="toPay(order.ACCOUNT_NUMBER, payment.ACCOUNT_NUMBER)">Оплатить</button>
                </div>
                <div v-if="payment_list">
                    <div class="s-orders__payment-wrapper">
                        <label 
                            v-for="(item, index) in payment_list" :key="index"
                            class="o-radio o-radio--img"
                        >
                            <input
                                name="PAY_SYSTEM_ID"
                                type="radio"
                                @click="changeToPay(order.ACCOUNT_NUMBER, payment.ACCOUNT_NUMBER, item.ID)"
                            >
                            <img :src="item.LOGOTIP" alt="">
                            <span>{{item.PSA_NAME}}</span>
                            <div class="o-radio__border"></div>
                        </label>
                    </div>
                    <button class="btn-simple" type="button" @click="prev">Назад</button>
                </div>
            </div>
        </template>
       
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
        }
    },
    computed: {
        ...mapGetters({
            sessid: 'user/getSessid',
        })
    },
    methods: {
         prev() {
            this.payment_list = false;
        },
        toPay(order_id, payment_id) {
            var payment = window.open(`/api/v1/payment/?ORDER_ID=${order_id}&PAYMENT_ID=${payment_id}`, 'Оплата', 'width=600,height=400');
        },

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
                console.log(response.data.PAYSYSTEMS_LIST)
                if (response.data.PAYSYSTEMS_LIST)
                    this.payment_list = response.data.PAYSYSTEMS_LIST;
            });
        }
    }
}
</script>
