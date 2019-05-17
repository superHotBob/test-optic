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
                <div class="basket__item" v-for="arItem in getBasket.GRID.ROWS" :key="arItem.ID">
                    <div class="basket__image">
                        <img src="" alt="">
                        <span>Sale</span>
                        <span>New</span>
                    </div>
                    <button v-on:click="deleteItem(arItem.ID)" type="button" class="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <quantity v-bind:id="arItem.ID"/>
                    <div class="basket__props">
                        <b class="basket__name">{{arItem.NAME}}</b>
                        <div class="basket__prop">
                            Ширина линзы
                            <span class="basket__square">59</span>
                        </div>
                        <div class="basket__prop">
                            Диагональ линзы
                            <span class="basket__square">62</span>
                        </div>
                        <div class="basket__prop">
                            Высота линзы
                            <span class="basket__square">37</span>
                        </div>
                        <div class="basket__prop">
                            Ширина наносника
                            <span class="basket__square">17</span>
                        </div>
                        <div class="basket__prop">
                            Длина дужки
                            <span class="basket__square">145</span>
                        </div>
                        <div class="basket__prop">
                            Цвет
                            <span class="basket__square"><img src="#" alt=""></span>
                        </div>
                        <div class="basket__prop">
                            Размер
                            <span class="basket__square">59/37/17/145</span>
                        </div>
                    </div>
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

import basket from '~/mixins/basket/basket.js'
import Quantity from '~/components/header/basket.small/Quantity.vue'

export default {
    props: ['isLogged'],
    mixins: [basket],
    components: {
        Quantity
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
        }
    },
    computed: {
        showPopup() {
            if (this.getBasket.BASKET_ITEMS_COUNT === 0) {
                return false;
            } else {
                return this.basketPopup;
            }
        }
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
  
