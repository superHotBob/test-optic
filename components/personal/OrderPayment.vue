<template>
<div class="user-order__block">
    <div class="user-order__header">Параметры оплаты</div>
    <div class="user-order__body">
        <div class="user-order__heading">
            <div class="user-order__payment-icon"></div>
            <div>
                <p>Заказ №37 от 06.06.2019, Принят, ожидается оплата</p>
                <p>Сумма заказа: {{info.orderSumm}}</p>
            </div>
        </div>
        <template  v-for="(system, index) in info.systems">
            <div class="user-order__info" v-if="system.selected"  :key="index">
                <img :src="system.img" alt="">
                <div>
                    <p>
                        <b>Счет №37/1 от 06.06.2019, {{system.name}}</b>
                        <span class="s-orders__status green" v-if="info.paid">Оплачено</span>
                        <span class="s-orders__status red" v-else>Не оплачено</span>
                    </p>
                    <p>Сумма к оплате по счету: {{info.paySumm}}</p>
                </div>
            </div>
        </template>
        <div class="s-orders__payment mb-3">
            <div v-show="paymentTab == false">
                <button class="s-orders__change btn-simple mb-2" type="button" @click="paymentTab = true">Сменить способ оплаты</button>
                <br>
                <button class="button black bold" type="button">Оплатить</button>
            </div>
            <div v-show="paymentTab != false">
                <div class="s-orders__payment-wrapper">
                    <label
                        class="o-radio o-radio--img"
                        v-for="(system, index) in info.systems"
                        :key="index"
                        @click.stop="toggleSystem(system.value)"
                    >
                        <input
                            name="PAY_SYSTEM_ID"
                            type="radio"
                            :value="system.value"
                            :checked="system.selected"
                            @click.stop
                        >
                        <img :src="system.img" alt="">
                        <span>{{system.name}}</span>
                        <div class="o-radio__border"></div>
                    </label>
                </div>
                <button class="btn-simple" type="button" @click="paymentTab = false">Назад</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: ['info'],
    data() {
        return {
            paymentTab: false,
        }
    },
    methods: {
        toggleSystem(id) {
            for (let system in this.info.systems) {
                if (this.info.systems[system].value == id)
                    this.info.systems[system].selected = true;
                else
                    this.info.systems[system].selected = false;
            }
        }
    }
}
</script>
