<template>
<div class="s-orders__item">
    <div class="s-orders__header">
        <div class="s-orders__name">
            <b>Заказ № 38 ОТ 07.06.2019 09:31:42, 1 товар на сумму 5 469.50 руб.</b>
        </div>
    </div>
    <div class="s-orders__body">
        <div class="s-orders__sub-header">
            <span>Оплата</span>
            <i></i>
        </div>
        <div class="s-orders__heading">
            <p>Счет №37/1 от 06.06.2019, Банковский перевод</p>
            <span class="s-orders__status green">Оплачено</span>
        </div>
        <p class="s-orders__data">Сумма к оплате по счету: 9 535.46 руб.</p>
        <div class="s-orders__payment">
            <div v-show="paymentTab == false">
                <button class="s-orders__change btn-simple mb-2" type="button" @click="paymentTab = true">Сменить способ оплаты</button>
                <br>
                <button class="button black" type="button">Оплатить</button>
            </div>
            <div v-show="paymentTab != false">
                <div class="s-orders__payment-wrapper">
                    <label class="o-radio o-radio--img">
                        <input name="PAY_SYSTEM_ID" type="radio" value="2">
                        <img src="http://14.esobolev.ru//upload/sale/paysystem/logotip/569/56957ce1e60b58571eaccb8554657f20.png" alt="">
                        <span>PayPal</span>
                        <div class="o-radio__border"></div>
                    </label>
                    <label class="o-radio o-radio--img">
                        <input name="PAY_SYSTEM_ID" type="radio" value="4">
                        <img src="http://14.esobolev.ru//upload/resize_cache/sale/paysystem/logotip/890/300_300_1/89021eff8040b03e19c72a2370b83dc0.png" alt="">
                        <span>Webmoney</span>
                        <div class="o-radio__border"></div>
                    </label>
                    <label class="o-radio o-radio--img">
                        <input name="PAY_SYSTEM_ID" type="radio" value="3">
                        <img src="http://14.esobolev.ru//upload/resize_cache/sale/paysystem/logotip/2a3/300_300_1/2a3a6059c18ace49d72a524f19ea1744.png" alt="">
                        <span>Наличный расчет</span>
                        <div class="o-radio__border"></div>
                    </label>
                </div>
                <button class="btn-simple" type="button" @click="paymentTab = false">Назад</button>
            </div>
        </div>

        <div class="s-orders__sub-header mt-3">
            <span>Доставка</span>
            <i></i>
        </div>
        <div class="s-orders__heading">
            <p>Отгрузка	№37/2, стоимость доставки 500 руб.</p>
            <span class="s-orders__status red">Не отгружено</span>
        </div>
        <p class="s-orders__data">Статус отгрузки: <span class="s-orders__status">Ожидает обработки</span></p>
        <p class="s-orders__data">Служба доставки: Доставка курьером</p>

        <div class="s-orders__sub-header mt-3">
            <i></i>
        </div>
        <div class="s-orders__buttons">
            <nuxt-link class="s-orders__detail mr-4" to="/personal/orders/1">Подробнее о заказе</nuxt-link>
            <nuxt-link class="s-orders__repeat mr-3" to="#0">Повторить заказ</nuxt-link>
            <nuxt-link class="s-orders__cancel" to="#0">Отменить заказ</nuxt-link>
        </div>
    </div>
</div>
</template>

<script>

export default {
    data() {
        return {
            paymentTab: false,
        }
    }
}
</script>
