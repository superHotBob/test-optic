<template>
<div>
    <div class="content-header">
        <div class="main-container">
            <h2>Мои заказы</h2>
            <ul class="breadcrumbs">
                <li><nuxt-link to="/">Главная</nuxt-link></li>
                <li><nuxt-link to="/personal">Мой кабинет</nuxt-link></li>
            </ul>
        </div>
    </div>
    <div class="orders main-container">
        <div class="orders__nav">
            <nuxt-link v-if="$route.query.filter_history == 'Y'" to="/personal/orders">
                <span>Показать текущие заказы</span>
            </nuxt-link>
            <nuxt-link v-if="$route.query.show_canceled == 'Y' || ($route.query.filter_history != 'Y' && $route.query.show_canceled != 'Y')" :to="{query: { filter_history: 'Y' }}">
                <span>Посмотреть историю заказов</span>
            </nuxt-link>
            <nuxt-link v-if="$route.query.filter_history == 'Y' && $route.query.show_canceled != 'Y'" :to="{query: { filter_history: 'Y', show_canceled: 'Y' }}">
                <span>Посмотреть историю отмененных заказов</span>
            </nuxt-link>
        </div>
        <div v-if="$route.query.filter_history == 'Y'">
            <h2 v-if="$route.query.show_canceled == 'Y'">Отменённые заказы</h2>
            <h2 v-else>История заказов</h2>
            <div class="orders__small s-orders">

                <div class="s-orders__item">
                    <div class="s-orders__header">
                        <div class="s-orders__name">
                            <b>Заказ № 38 ОТ 07.06.2019 09:31:42, 1 товар на сумму 5 469.50 руб.</b>
                        </div>
                        <div class="s-orders__info">
                            <p class="s-orders__canceled">Заказ отменен</p>
                            <p class="s-orders__date">07.06.2019</p>
                        </div>
                    </div>
                    <div class="s-orders__body p-20">
                        <nuxt-link class="s-orders__detail mr-auto" to="/personal/orders/1">Подробнее о заказе</nuxt-link>
                        <nuxt-link class="s-orders__repeat" to="#0">Повторить заказ</nuxt-link>
                    </div>
                </div>

                <div class="s-orders__item">
                    <div class="s-orders__header">
                        <div class="s-orders__name">
                            <b>Заказ № 38 ОТ 07.06.2019 09:31:42, 1 товар на сумму 5 469.50 руб.</b>
                        </div>
                        <div class="s-orders__info">
                            <p class="s-orders__canceled">Заказ отменен</p>
                            <p class="s-orders__date">07.06.2019</p>
                        </div>
                    </div>
                    <div class="s-orders__body p-20">
                        <nuxt-link class="s-orders__detail mr-auto" to="/personal/orders/1">Подробнее о заказе</nuxt-link>
                        <nuxt-link class="s-orders__repeat" to="#0">Повторить заказ</nuxt-link>
                    </div>
                </div>

            </div>
        </div>
        <div v-else>
            <h2>Заказы в статусе «Принят, Ожидается оплата»</h2>
            <div class="orders__small s-orders">
                <current-order />
            </div>
        </div>
    </div>
</div>
</template>

<script>
import CurrentOrder from '~/components/personal/CurrentOrder.vue'

export default {
    middleware: 'auth',
    components: {
        CurrentOrder,
    }
}
</script>


<style lang="scss">
.orders {
    margin-top: 40px;
    color: #4a4a4a;
    h2 {
        font-size: 20px;
        font-weight: 400;
        text-transform: uppercase;
        color: #000;
    }
    &__nav {
        a {
            display: inline-block;
            margin-right: 10px;
            color: #000;
        }
        + div {
            margin-top: 40px;
        }
    }
}
.s-orders {
    .button.black {
        padding: 0 15px;
        font-weight: 700;
    }
    &__item {
        &:not(:first-of-type) {
            margin-top: 10px;
        }
    }
    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px;
        background-color: #f2f2f2;
    }
    &__name {
        font-size: 15px;
        color: #000;
    }
    &__info {
        flex-shrink: 0;
        p {
            font-size: 13px;
            font-weight: 700;
            text-align: right;
            &:last-of-type {
                margin-bottom: 0;
            }
        }
    }
    &__canceled {
        margin-bottom: 10px;
        color: #f00;
    }
    &__date {
        margin-bottom: 0;
        color: #999;
    }
    &__body {
        display: flex;
        flex-wrap: wrap;
        padding: 15px;
        padding-bottom: 10px;
        border: 1px solid #f2f2f2;
        &.p-20 {
            padding: 20px 15px;
            padding-bottom: 15px;
        }
        a {
            display: inline-block;
        }
    }
    &__detail {
        margin-bottom: 5px;
        font-weight: 700;
        color: #000;
    }
    &__repeat {
        margin-bottom: 5px;
        font-size: 13px;
        color: #000;
        &::before {
            content: "";
            display: inline-block;
            width: 13px;
            height: 13px;
            margin-right: 3px;
            background: url('~assets/images/icons/sale-order-repeat.svg') no-repeat center;
        }
    }
    &__cancel {
        margin-bottom: 5px;
        font-size: 13px;
        color: #999;
    }
    &__sub-header {
        display: flex;
        align-items: center;
        width: 100%;
        padding-bottom: 15px;
        font-size: 10px;
        font-weight: 700;
        text-transform: uppercase;
        color: #999;
        span {
            margin-right: 5px;
        }
        i {
            display: block;
            height: 1px;
            flex-grow: 1;
            background-color: #f2f2f2;
        }
    }
    &__heading {
        width: 100%;
        margin-bottom: 5px;
        p {
            display: inline-block;
            margin: 0;
            margin-bottom: 5px;
            margin-right: 6px;
            font-weight: 700;
            color: #000;
        }
        .s-orders__status {
            margin-left: 0;
        }
    }
    &__payment {
        width: 100%;
        margin-top: 5px;
        .o-radio {
            width: 200px;
            margin-bottom: 20px;
            margin-left: 20px;
        }
    }
    &__payment-back {
        margin-top: 10px;
    }
    &__payment-wrapper {
        display: flex;
        flex-wrap: wrap;
        margin-left: -20px;
    }
    &__data {
        width: 100%;
        margin-bottom: 5px;
        font-size: 13px;
    }
    &__status {
        display: inline-block;
        margin-left: 6px;
        padding: 4px 10px 5px 8px;
        font-size: 12px;
        font-weight: 700;
        color: #535c69;
        background: #f3f4f5;
        border: 1px solid rgba(128,134,142,0.20);
        border-radius: 2px;
        &.red {
            color: #d0021b;
            background: #ffe5e8;
            border: 1px solid #eab3b9;
        }
        &.green {
            background: #e3f0bd;
            border: 1px solid #bed277;
            color: #597707;
        }
    }
    &__buttons {
        width: 100%;
    }
}

@media (max-width: 475px) {
    .s-orders {
        &__payment {
            .o-radio {
                width: 100%;
                margin-bottom: 10px;
                margin-left: 0;
            }
        }
        &__payment-wrapper {
            margin-left: 0;
        }
    }
}
</style>
