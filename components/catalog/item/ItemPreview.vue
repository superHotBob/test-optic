<template>
<b-modal v-model="showModal" class="item-preview" id="item-preview" hide-header hide-footer>
    <template v-if="item">
        <button class="modal-close" @click="$bvModal.hide('item-preview')"></button>
        <div class="item-preview__img">
            <img v-for="(img, index) in item.CURRENT.MORE_PHOTO" :key="index" :src="img"/>
            <div class="item__flags">
                <span v-if="labelNew" class="item__flag left">NEW</span>
                <span v-if="labelSale" class="item__flag right red">SALE</span>
            </div>
        </div>
        <div class="item-preview__content">
            <b class="item-preview__name">{{item.CURRENT.NAME}}</b>
            <div class="item-preview__rating">
                <div class="rating">
                    <div class="rating__stars" style="width: 80%;"></div>
                </div>
                <p>0 отзывов</p>
            </div>
            <p
                class="item-preview__price"
                v-for="price in item.CURRENT.ITEM_PRICES"
                :key="price.ID"
            >
                {{price.PRINT_RATIO_PRICE}}
            </p>
            <p class="item-preview__available">
                <svg width="15" height="15" fill="#000"><use href="#svg-layers" /></svg>
                Много
            </p>
            <div
                class="item__offers"
                v-for="prop in item.SKU_PROPS"
                :key="prop.ID"
                ref="sku_line_block"
                >
                <p>{{prop.NAME}}</p>
                <ul>
                    <li
                        :data-value="value.ID"
                        @click.prevent="selectOfferProp(prop.ID, value.ID, $event)"
                        v-for="value in prop.VALUES"
                        :key="value.ID"
                    >
                        <img v-if="value.PICT" :src="value.PICT.SRC" alt="">
                        <span v-if="!value.PICT">{{value.NAME}}</span>
                    </li>
                </ul>
            </div>
            <hr>
            <nuxt-link class="item-preview__link" :to="{path: item.URL}">Перейти на страницу товара ></nuxt-link>
            <div class="item-preview__buttons">
                <div class="counter">
                    <button @click="counterMinus">-</button>
                    <the-mask mask="FFF" :tokens="regxNumbers" v-model="itemAmount"/>
                    <button @click="itemAmount++">+</button>
                </div>
                <button class="button black" @click.prevent="basket(item.CURRENT.ADD_URL)">В корзину</button>
                <button class="button">
                    <svg id="svg-icon-click" fill="#000" viewBox="0 0 18 25.929" width="20" height="20">
                        <path d="M18 18L8.353 8.646 7 9v14l3.658-1.835 2.196 4.764.034-.026.006.012 3.186-1.688-2.222-5.168L18 19v-1zm-4.313.062l-1.025.738 2.263 4.908-1.623.859-2.196-4.762L8 21.438V9.707l8.317 8.317-2.63.038z"></path>
                        <path d="M1 8a7 7 0 1 1 14 0 6.959 6.959 0 0 1-.697 3.03l.869.497A7.95 7.95 0 0 0 16 8 8 8 0 0 0 0 8c0 3.727 2.551 6.849 6 7.738v-1.031A7.001 7.001 0 0 1 1 8z"></path>
                        <path d="M8 5a3 3 0 0 1 3 3c0 .365-.075.709-.194 1.033l.885.506A4 4 0 1 0 4 8a3.98 3.98 0 0 0 2 3.445v-1.224C5.39 9.672 5 8.885 5 8a3 3 0 0 1 3-3z"></path>
                    </svg>
                    Купить в один клик
                </button>
            </div>
        </div>
    </template>
</b-modal>
</template>

<script>

import offers from '~/mixins/offers.js'
import { mapGetters } from 'vuex'

export default {
    mixins: [offers],
    data() {
        return {
            showModal: false,
            itemAmount: 1,
            regxNumbers: {
                F: {
                    pattern: /[0-9]/,
                }
            },
            item: false,
            timer: null,
            id: false,
        }
    },
    mounted() {
        this.$root.$on('preview', (item) => {
            this.item = JSON.parse(JSON.stringify(item));
            this.id = item.ID;
            this.$bvModal.show('item-preview');
            if (this.item.PRODUCT && this.item.PRODUCT.TYPE == 3) {
                setTimeout(() => {
                    this.setCurrent();
                }, 100) 
            }
        }); 
    },
    methods: {
        async basket(url) {
            let response = await this.$axios.get(`${url}&ajax_basket=Y&quantity=${this.itemAmount}`);
            this.$store.dispatch('basket/STATE');
        },
        counterMinus() {
            if (this.itemAmount <= 1) {
                return
            } else {
                this.itemAmount--;
            }
        }
    },
    computed: {
        labelNew() {
            if (this.item.DISPLAY_PROPERTIES.new)
                return true;
            return false;
        },
        labelSale() {
            var selectedPrice = this.item.CURRENT.ITEM_PRICE_SELECTED;

            if (this.item.CURRENT.ITEM_PRICES[selectedPrice].RATIO_DISCOUNT)
                return true;
            return false;
        }
    },

}
</script>
