<template>
<div class="basket page-header__basket">
    <div class="basket__button hidden-mobile" :class="{'active': showPopup}" @click="basketPopup = !basketPopup" ref="basketBtn">
        <button class="btn-icon">
            <svg width="27" height="27" stroke="#000"><use href="#svg-bag"/></svg>
            Корзина
        </button>
        <p>{{getBasket.BASKET_ITEMS_COUNT}} шт. - <b>{{getBasket.allSum_FORMATED}}</b></p>
    </div>

    <div class="basket__button hidden-desktop" v-b-modal.basket__mobile>
        <button class="btn-icon">
            <svg width="27" height="27" stroke="#000"><use href="#svg-bag"/></svg>
            Корзина
        </button>
    </div>

    <div class="basket__popup" :class="{'active': showPopup}" ref="dropdownMenu">
        <div class="hidden-mobile" v-if="getBasket.GRID">
            <basket-item v-for="arItem in getBasket.GRID.ROWS" :key="arItem.ID" :arItem="arItem"/>
            <div class="basket__footer">
                <button class="button black">Оформить заказ</button>
                <span>Всего {{getBasket.BASKET_ITEMS_COUNT}} {{wording(getBasket.BASKET_ITEMS_COUNT)}}</span>
                <b>{{getBasket.allSum_FORMATED}}</b>
            </div>
        </div>
    </div>
    <b-modal class="basket__mobile hidden-desktop" id="basket__mobile" hide-header hide-footer>
        <button class="modal-close" @click="$bvModal.hide('basket__mobile')"></button>
        <div class="basket__top">
            <p>В вашей корзине:</p>
            <p>{{getBasket.BASKET_ITEMS_COUNT}} шт. - <b>{{getBasket.allSum_FORMATED}}</b></p>
        </div>
        <div class="basket__header-panel header-panel">
            <p>
                <nuxt-link to="/basket">
                    <span>Корзина</span>
                    <span>{{getBasket.BASKET_ITEMS_COUNT}}</span>
                </nuxt-link>
            </p>
            <p>
                <nuxt-link to="#0">
                    <span>Сравнение</span>
                    <span>13</span>
                </nuxt-link>
            </p>
            <p>
                <nuxt-link to="#0">
                    <span>Список желаемого</span>
                    <span>26</span>
                </nuxt-link>
            </p>
            <p v-if="!isLogged">
                <a class="header-panel__login" @click="$bvModal.hide('basket__mobile'); $bvModal.show('auth-modal')">
                    <span>Вход</span>
                </a>
            </p>
        </div>
    </b-modal>
</div>
</template>

<script>

import util from '~/mixins/util.js'
import basket from '~/mixins/basket/basket.js'
import BasketItem from '~/components/header/basket.small/BasketItem.vue'

export default {
    props: ['isLogged'],
    mixins: [util, basket],
    components: {
        BasketItem,
    },
    data() {
        return {
            basketPopup: false,
        }
    },
    methods: {
        documentClick(e) {
            let el = this.$refs.dropdownMenu,
                target = e.target,
                basketBtn = this.$refs.basketBtn;

            if ((el !== target) && !el.contains(target) && (basketBtn !== target) && !basketBtn.contains(target)) {
                this.basketPopup=false;
            }
        },
    },
    computed: {
        showPopup() {
            if (this.getBasket.BASKET_ITEMS_COUNT === 0) {
                return false;
            } else {
                return this.basketPopup;
            }
        },
    },
    created() {
        this.$store.dispatch('basket/STATE');
    },
    mounted() {
        window.addEventListener('click', this.documentClick);
    },
    beforeDestroy () {
        window.removeEventListener('click', this.documentClick)
    }
}
</script>
  
