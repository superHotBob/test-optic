<template>

    <div class="basket page-header__basket">
        <div class="basket__button" :class="{'active': basketPopup}" @click="basketPopup = !basketPopup" ref="basketBtn">
            <button class="btn-icon">
                <svg width="27" height="27" stroke="#000"><use href="#svg-bag"/></svg>
                Корзина
            </button>
            <p class="hidden-mobile">{{getBasket.BASKET_ITEMS_COUNT}} шт. - <b>{{getBasket.allSum_FORMATED}}</b></p>
        </div>

        <div class="basket__popup" :class="{'active': basketPopup}" ref="dropdownMenu">
            <div class="hidden-mobile">
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

            <div class="hidden-desktop">
                <div class="basket__top">
                    <p>В вашей корзине:</p>
                    <p>{{getBasket.BASKET_ITEMS_COUNT}} шт. - <b>{{getBasket.allSum_FORMATED}}</b></p>
                </div>
                <div class="basket__header-panel header-panel">

                </div>
            </div>

        </div>
    </div>
</template>

<script>

import basket from '~/mixins/basket/basket.js'
import Quantity from '~/components/header/basket.small/Quantity.vue'

export default {
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
    mounted() {
        window.addEventListener('click', this.documentClick)
    },
    beforeDestroy () {
        window.removeEventListener('click', this.documentClick)
    }
}
</script>
  
