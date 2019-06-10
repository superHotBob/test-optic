<template>
<div>
    <div class="content-header">
        <div class="main-container">
            <h2>Мои заказы</h2>
            <ul class="breadcrumbs">
                <li><nuxt-link to="/">Главная</nuxt-link></li>
                <li><nuxt-link to="/personal">Мой кабинет</nuxt-link></li>
                <li><nuxt-link to="/personal/orders">Мои заказы</nuxt-link></li>
            </ul>
        </div>
    </div>
    <div class="user-order main-container">
        <h1>Мой заказ №37, создан 06.06.2019</h1>
        <div class="user-order__block">
            <div class="user-order__header small">
                Заказ №37 от 06.06.2019, 1 товар на сумму {{paymentInfo.orderSumm}}
            </div>
        </div>
        <div class="user-order__block">
            <div class="user-order__header">Информация о заказе</div>
            <div class="user-order__body">
                <div class="user-order__info-table">
                    <div class="user-order__info-row heading">
                        <div>Ф.И.О.:</div>
                        <div>Текущий статус, от 06.06.2019:</div>
                        <div>Сумма:</div>
                        <div><button class="user-order__repeat btn-simple">Повторить заказ</button></div>
                    </div>
                    <div class="user-order__info-row">
                        <div><b>vladimir</b></div>
                        <div><b>Принят, ожидается оплата</b></div>
                        <div><b>{{paymentInfo.paySumm}}</b></div>
                        <div>
                            <button class="user-order__repeat btn-simple hidden-desktop mr-2">Повторить заказ</button>
                            <button class="user-order__cancel btn-simple">Отменить</button>
                        </div>
                    </div>
                </div>
                <button class="btn-simple mt-4" v-if="showInfo == false" @click="showInfo = true">Подробнее</button>
                <button class="btn-simple mt-4" v-else @click="showInfo = false">Скрыть</button>
                <div class="user-order__info-list" v-show="showInfo == true">
                    <h3>Информация о пользователе</h3>
                    <ul>
                        <li>
                            <p>Логин:</p>
                            <p>login</p>
                        </li>
                        <li>
                            <p>E-mail адрес:</p>
                            <p>test@mail.ru</p>
                        </li>
                        <li>
                            <p>Тип плательщика:</p>
                            <p>Физическое лицо</p>
                        </li>
                        <li>
                            <p>Ф.И.О.:</p>
                            <p>Иван Иванович</p>
                        </li>
                        <li>
                            <p>E-Mail:</p>
                            <p>aaa@aaa.aaa</p>
                        </li>
                        <li>
                            <p>Индекс:</p>
                            <p>101000</p>
                        </li>
                        <li>
                            <p>Местоположение:</p>
                            <p>Россия, Центр, Московская область, Москва</p>
                        </li>
                        <li>
                            <p>Город:</p>
                            <p>Москва</p>
                        </li>
                        <li>
                            <p>Адрес доставки:</p>
                            <p>ул.Доваторцев 86</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <order-payment :info="paymentInfo"/>
        <template v-if="getBasket.GRID">
            <order-delivery :info="deliveryInfo" :items="getBasket.GRID.ROWS"/>
            <order-content :items="getBasket.GRID.ROWS"/>
        </template>
    </div>
</div>
</template>

<script>
import OrderPayment from '~/components/personal/OrderPayment.vue'
import OrderDelivery from '~/components/personal/OrderDelivery.vue'
import OrderContent from '~/components/personal/OrderContent.vue'

import basket from '~/mixins/basket/basket.js' // для примера данных предметов

export default {
    middleware: 'auth',
    mixins: [basket],
    data() {
        return {
            showInfo: false,
            paymentInfo: {
                systems: {
                    0: {
                        name: 'PayPal',
                        img: 'http://14.esobolev.ru//upload/sale/paysystem/logotip/569/56957ce1e60b58571eaccb8554657f20.png',
                        value: 2,
                        selected: true,
                    },
                    1: {
                        name: 'WebMoney',
                        img: 'http://14.esobolev.ru//upload/resize_cache/sale/paysystem/logotip/890/300_300_1/89021eff8040b03e19c72a2370b83dc0.png',
                        value: 4,
                        selected: false,
                    },
                    2: {
                        name: 'Наличный расчет',
                        img: 'http://14.esobolev.ru//upload/resize_cache/sale/paysystem/logotip/2a3/300_300_1/2a3a6059c18ace49d72a524f19ea1744.png',
                        value: 3,
                        selected: false,
                    },
                },
                paid: false,
                orderSumm: '9 535.46 руб.',
                paySumm: '9 535.46 руб.',
            },
            deliveryInfo: {
                cost: '500 руб.',
                system: {
                    name: 'Доставка курьером',
                    img: 'https://home-optic.ru/upload/sale/delivery/logotip/138/1382eb4390d1fcf8e248af9508c52f7b.png',
                },
                status: 'Ожидает обрабоки',
            },
            items: {
                0: {
                    name: 'Оправа Brendel 902145-50',
                }
            }
        }
    },
    components: {
        OrderPayment,
        OrderDelivery,
        OrderContent,
    },
}
</script>

<style lang="scss">
.user-order {
    margin-top: 40px;
    font-size: 13px;
    a {
        display: inline-block;
    }
    &__block {
        margin-bottom: 20px;
        &:last-of-type {
            margin-bottom: 0;
        }
    }
    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px;
        font-size: 21px;
        text-transform: uppercase;
        background-color: #f2f2f2;
        &.small {
            font-size: 15px;
            text-transform: none;
        }
    }
    &__body {
        display: flex;
        flex-wrap: wrap;
        padding: 15px;
        padding-bottom: 10px;
        border: 1px solid #f2f2f2;
    }
    &__info-table {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
    }
    &__info-row {
        display: flex;
        width: 100%;
        margin-bottom: 3px;
        font-size: 14px;
        &.heading {
            font-size: 13px;
            color: #888;
        }
        > div {
            word-wrap: break-word;
            flex-grow: 1;
            flex-shrink: 0;
            &:not(:last-of-type) {
                padding-right: 7px;
            }
            &:nth-of-type(1) {
                width: 30%;
            }
            &:nth-of-type(2) {
                width: 30%;
            }
            &:nth-of-type(3) {
                width: 15%;
            }
            &:nth-of-type(4) {
                text-align: center;
                width: 100px;
            }
        }
    }
    &__repeat {
        font-size: 12px;
    }
    &__cancel {
        font-size: 13px;
        color: #999;
    }
    &__info-list {
        width: 100%;
        h3 {
            padding: 10px 0;
            font-size: 21px;
            text-transform: uppercase;
            border-bottom: 1px solid #f2f2f2;
        }
        ul {
            list-style: none;
            margin: 0;
            padding: 0;
        }
        li {
            margin-bottom: 15px;
        }
        p {
            margin: 0;
            &:nth-of-type(1) {
                font-size: 13px;
                color: #888;
            }
            &:nth-of-type(2) {
                font-size: 14px;
                font-weight: 700;
                color: #000;
            }
        }
    }
    &__heading {
        display: flex;
        align-items: center;
        p {
            margin: 0;
            font-size: 15px;
        }
    }
    &__payment-icon {
        flex-shrink: 0;
        width: 46px;
        height: 54px;
        margin-right: 5px;
        background: url('~assets/images/icons/sale-personal-order-payment-options.svg') no-repeat center;
    }
    &__info {
        display: flex;
        width: 100%;
        margin: 20px 0;
        img {
            align-self: center;
            flex-shrink: 0;
            width: 170px;
            height: 50px;
            margin-right: 10px;
            object-fit: contain;
        }
        p {
            margin-bottom: 0;
            color: #4a4a4a;
        }
        b {
            margin-right: 6px;
            font-size: 14px;
            color: #000;
        }
        .s-orders__status {
            margin: 0;
        }
    }
    .cart__heading {
        margin-top: 0;
    }
    .cart__items {
        margin-bottom: 10px;
    }
    .s-orders__change,
    .btn-simple {
        text-decoration: underline;
    }
    .basket-item__actions,
    .cart__actions {
        width: 100px;
    }
    .basket-item__actions {
        justify-content: center;
    }
}

@media (max-width: 768px) {
    .user-order {
        &__info-row {
            flex-wrap: wrap;
            &.heading {
                display: none;
            }
            > div {
                margin-bottom: 10px;
                &::before {
                    display: block;
                    margin-right: 7px;
                    font-size: 13px;
                    color: #888;
                }
                &:nth-of-type(n) {
                    width: 50%;
                }
                &:nth-of-type(1) {
                    &::before {
                        content: "Ф.И.О.:";
                    }
                }
                &:nth-of-type(2) {
                    &::before {
                        content: "Текущий статус:";
                    }
                }
                &:nth-of-type(3) {
                    &::before {
                        content: "Сумма::";
                    }
                }
                &:nth-of-type(4) {
                    &::before {
                        content: "Действия:";
                    }
                }
                &:nth-of-type(2),
                &:nth-of-type(4) {
                    padding: 0;
                    text-align: right;
                }
            }
        }
        .basket-item__actions,
        .cart__actions {
            width: 100%;
        }
        .basket-item__actions {
            justify-content: flex-start;
        }
    }
}
@media (max-width: 500px) {
    .user-order {
        &__heading {
            p {
                font-size: 14px;
            }
        }
        &__info {
            margin: 10px 0;
            img {
                margin: 0;
                margin-bottom: 10px;
            }
            flex-wrap: wrap;
            p {
                width: 100%;
            }
        }
    }
}
</style>
