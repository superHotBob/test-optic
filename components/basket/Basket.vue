<template>
<div>
    <div class="content-header">
        <div class="main-container">
            <h2>Корзина</h2>
            <ul class="breadcrumbs">
                <li><nuxt-link to="/">Главная</nuxt-link></li>
            </ul>
        </div>
    </div>
    <div class="cart main-container">
        <!-- <div class="cart__controls">
            <button :class="{'active': postponed == false}" @click="postponed = false">Товары в корзине (n)</button>
            <button :class="{'active': postponed == true}" @click="postponed = true">Отложенные товары (z)</button>
        </div> -->
        <div class="cart__heading">
            <b class="cart__info">Товары</b>
            <b class="cart__price">Цена</b>
            <b class="cart__discount" v-if="postponed">Скидка</b>
            <b class="cart__summ">Сумма</b>
            <b class="cart__actions">Количество</b>
        </div>
        <div class="cart__items" v-if="getBasket.GRID">
            <basket-item class="cart__item" v-for="item in getBasket.GRID.ROWS" :key="item.ID" :item="item" :postponed="postponed"/>
        </div>
        <div class="cart__bottom">
            <div class="cart__promocode">
                <label class="textfield">
                    <input name="promocode" v-model="promocode" type="text" placeholder="Код купона для скидки">
                </label>
                <button class="button black" @click="addPromocode()">Применить</button>
                <div>
                    <ul v-if="getBasket.COUPON_LIST">
                        <template v-for="(coupon, index) in getBasket.COUPON_LIST">
                            
                            <li v-if="coupon.ACTIVE === 'Y'" :key="index">
                                {{coupon.COUPON}}
                                <span class="delete" @click="delPromo(coupon.COUPON)"></span>
                            </li>
                        </template>
                    </ul>
                </div>
            </div>
            <div class="cart__summary">
                <p>
                    <span>Товаров на:</span>
                    <b>{{getBasket.allSum_FORMATED}}</b>
                </p>
                <p>
                    <span>Без скидки:</span>
                    <b>{{getBasket.PRICE_WITHOUT_DISCOUNT}}</b>
                </p>
                <p>
                    <span>Скидка:</span>
                    <b>{{getBasket.DISCOUNT_PRICE_ALL_FORMATED}}</b>
                </p>
                <p>
                    <span>Итого:</span>
                    <b>{{getBasket.allSum_FORMATED}}</b>
                </p>
                <div class="cart__summary-buttons">
                    <button class="button">Продолжить покупки</button>
                    <nuxt-link class="button black" :to="{ name: 'order'}">Оформить заказ</nuxt-link>
                </div>
            </div>
        </div>
        <item-slider class="cart__slider" items="recommended"/>
    </div>
</div>
</template>

<script>
import basket from '~/mixins/basket/basket.js'

import BasketItem from '~/components/basket/BasketItem.vue'
import ItemSlider from '~/components/sliders/ItemSlider.vue'

export default {
    mixins: [basket],
    data() {
        return {
            promocode:'',
            postponed: false,
        }
    },
    components: {
        BasketItem,
        ItemSlider,
    },
    computed: {

    },
    methods: {
        addPromocode() {
            if (this.promocode != '') {
                this.$store.dispatch('basket/ADD_COUPON', this.promocode);
            }    
        },
        delPromo(text) {
            this.$store.dispatch('basket/DELETE_CPUPON', text);
        }
    },
}
</script>

<style lang="scss">
    .cart {
        &__promocode {
            li {
                display: flex;
                word-wrap: break-word;
                margin: 0;
                margin-top: 5px;
                margin-right: 20px;
                padding: 0;
                color: #A94442;
                font-weight: 700;
            }
            .delete {
                position: relative;
                width: 20px;
                margin-left: 2px;
                cursor: pointer;
                &::after {
                    content: "";
                    position: absolute;
                    top: 50%;
                    right: 9px;
                    width: 2px;
                    height: 14px;
                    background-color: #000;
                    -webkit-transform: translateY(-50%) rotate(45deg);
                    transform: translateY(-50%) rotate(45deg);
                }
                &::before {
                    content: "";
                    position: absolute;
                    top: 50%;
                    right: 9px;
                    width: 2px;
                    height: 14px;
                    background-color: #000;
                    -webkit-transform: translateY(-50%) rotate(-45deg);
                    transform: translateY(-50%) rotate(-45deg)
                }
            }
        }
    }
</style>

