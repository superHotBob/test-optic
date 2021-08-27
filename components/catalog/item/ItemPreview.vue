<template>
<b-modal v-model="showModal" class="item-preview" id="item-preview" hide-header hide-footer>
    <template v-if="item">
        <button class="modal-close" @click="$bvModal.hide('item-preview')" />
        <div class="item-preview__img">           
            <b-carousel
                id="carousel-10"           
                :interval="40000"
                controls
                indicators
                background="#fff"          
            >
                <b-carousel-slide  :key="index" v-for="(img, index) in item.CURRENT.MORE_PHOTO" >
                    <template>
                    <img
                        :alt="img"             
                        @click="lightboxClick()"             
                        :src="'https://home-optic.ipol.tech' + img"
                    />
                    <!-- <client-only>
                        <vue-easy-lightbox @hide="lightboxClick" :visible="lightbox" :imgs="'https://home-optic.ipol.tech' + img"></vue-easy-lightbox>
                    </client-only> -->
                    </template>             
                </b-carousel-slide>               
            </b-carousel>
            <div class="item__flags">
                <span v-if="labelNew" class="item__flag left">NEW</span>
                <span v-if="labelSale" class="item__flag right red">-{{labelSale}}%</span>
            </div>
        </div>
        <div class="item-preview__content">
            <b class="item-preview__name">{{item.CURRENT.NAME}}</b>
            
            <div class="item-preview__rating">
                <star-rating class="rating" :rating="rating" :read-only="true" :show-rating="false" :round-start-rating="false"/>
                <span v-if="item.DISPLAY_PROPERTIES.BLOG_COMMENTS_CNT">({{item.DISPLAY_PROPERTIES.BLOG_COMMENTS_CNT.value}})</span>
                <span v-else>(0)</span>
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
                        <img v-if="value.PICT && value.PICT.ID !== 0" :src="'https://home-optic.ru' + value.PICT.SRC" alt="">
                        <span v-if="!value.PICT || value.PICT.ID == 0">{{value.NAME}}</span>
                    </li>
                </ul>
            </div>
            <hr>
            <nuxt-link class="item-preview__link" @click.native="$bvModal.hide('item-preview')" :to="{path: item.URL}">Перейти на страницу товара ></nuxt-link>
            <div class="item-preview__buttons">
                <div class="counter" v-if="!item.PROPERTIES.lins">
                    <button @click="counterMinus">-</button>
                    <the-mask mask="FFF" :tokens="regxNumbers" v-model="itemAmount"/>
                    <button @click="itemAmount++">+</button>
                </div>
                <button class="button black" @click.prevent="addToBasket(item.CURRENT.ADD_URL)">В корзину</button>
                <button class="button" @click="buy1click()">
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
import item from '~/mixins/item.js'
import { mapGetters } from 'vuex'
import StarRating from 'vue-star-rating'

export default {
    mixins: [offers, item],
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
    components: {
        StarRating,
    },
    mounted() {
        this.$root.$on('preview', (item) => {
            this.item = JSON.parse(JSON.stringify(item));
            console.log('This is item',this.item);
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
        buy1click() {
            var item = this.item;
            this.$root.$emit('buy1click', {item})
            this.$bvModal.show('buyclick');
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
        rating() {
            if (this.item.DISPLAY_PROPERTIES.rating) 
                return this.item.DISPLAY_PROPERTIES.rating.value*1;
            return 0;
        },
        labelNew() {
            if (this.item.DISPLAY_PROPERTIES.new)
                return true;
            return false;
        },
        labelSale() {
            if(this.item.CURRENT.ITEM_PRICES[0].RATIO_BASE_PRICE > this.item.CURRENT.ITEM_PRICES[0].PRICE) 
            return this.item.CURRENT.ITEM_PRICES[0].PERCENT
            //console.log(this.item)

            // if (this.item.CURRENT.ITEM_PRICES[selectedPrice].RATIO_DISCOUNT != 'undefined')
            //     return true;
            return false;
        },
    }
}
</script>
<style>
    .item-preview__img {
        padding-top: 30px;
        position: relative;
    }
    .item-preview__img img {
        margin: 10px 3px;
    }
    .carousel-control-next-icon,
    .carousel-control-prev-icon,
    .carousel-indicators {
        position: absolute;
        top: 90% !important;
    }
   
</style>
