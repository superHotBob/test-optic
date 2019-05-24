<template>
<nuxt-link
    class="swiper-slide item"
    :class="{'item--wide': wideItem}"
    :to="{path: item.URL}"
>
    <button
        class="item__preview"
        v-if="!wideItem"
        @click.prevent="showModal"
    >
        Быстрый просмотр
    </button>
    <div class="item__wide-left">
        <div class="item__img">
            <img alt="" v-for="(img, index) in item.CURRENT.MORE_PHOTO" :key="index" v-lazy="img">
        </div>
        <div class="item__flags">
            <span v-if="labelNew" class="item__flag left">NEW</span>
            <span v-if="labelSale" class="item__flag right red">SALE</span>
        </div>
        <div class="counter" v-if="wideItem" @click.prevent>
            <button @click="counterMinus">-</button>
            <the-mask mask="FFF" :tokens="regxNumbers" v-model="itemAmount"/>
            <button @click="itemAmount++">+</button>
        </div>
    </div>
    <div class="item__wide-right">
        <div v-if="wideItem" style="height: 20px; border: 1px solid #999; text-align: right;">- - Rating placeholder - -</div>
        <p class="item__name" v-if="wideItem">{{item.CURRENT.NAME}}</p>
        <div class="item__wide-offers">
            <div
                class="item__offers"
                v-for="prop in item.SKU_PROPS"
                :key="prop.ID"
                ref="sku_line_block"
            >
                <p v-if="wideItem">{{prop.NAME}}</p>
                <ul>
                    <li
                        :data-value="value.ID"
                        @click.prevent="selectOfferProp(prop.ID, value.ID, $event)"
                        v-for="value in prop.VALUES"
                        :key="value.ID"
                        :class="{'img': (value.PICT && value.PICT.ID !== 0)}"
                    >
                        <img v-if="value.PICT && value.PICT.ID !== 0" :src="value.PICT.SRC" alt="" :title="value.NAME">
                        <span v-if="!value.PICT || value.PICT.ID == 0">{{value.NAME}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="item__wide-bottom">
            <div class="item__info">
                <p class="item__name" v-if="!wideItem">{{item.CURRENT.NAME}}</p>
                <template v-for="(price, index) in item.CURRENT.ITEM_PRICES">   
                    <p class="item__price" :key="price.ID">{{price.PRINT_RATIO_PRICE}}</p>
                    <p class="item__old-price" v-if="labelSale" :key="index">{{price.PRINT_BASE_PRICE}}</p>
                </template>
                <p class="item__sale">Еще -10% по акции</p>
            </div>
            <div class="item__buttons">
                <div class="counter" v-if="wideItem" @click.prevent>
                    <button @click="counterMinus">-</button>
                    <the-mask mask="FFF" :tokens="regxNumbers" v-model="itemAmount"/>
                    <button @click="itemAmount++">+</button>
                </div>
                <button
                    class="item__add-to-cart"
                    @click.prevent="addToBasket(item.CURRENT.ADD_URL)"
                >
                    В корзину
                </button>
                <button
                    class="item__favorite"
                    :class="{'active':isFavorites(item.ID)}"
                    @click.prevent="clickFavorites"
                >
                    <svg width="17" height="17" fill="#000"><use href="#svg-heart" /></svg>
                    <svg width="16" height="16" fill="#fff"><use href="#svg-heart2" /></svg>
                    В избранное
                </button>
                <button class="item__compare" @click.prevent>
                    <svg width="18" height="18" fill="#000"><use href="#svg-compare" /></svg>
                    В сравнение
                </button>
            </div>
        </div>
    </div>
</nuxt-link>
</template>

<script>

import offers from '~/mixins/offers.js'
import item from '~/mixins/item.js'
import { mapGetters } from 'vuex'

export default {
    mixins: [offers, item],
    props: {
        item: Object,
        wideItem: {
            type: Boolean,
            default: () => false,
        }
    },
    data() {
        return {
            timer: null,
            id: this.item.ID,
            itemAmount: 1,
            regxNumbers: {
                F: {
                    pattern: /[0-9]/,
                },
            },
        }
    },

    methods: {
        showModal() {
            this.$root.$emit('preview', this.item);
        },
        clickFavorites() {
            if (!!this.timer)
            {
                clearTimeout(this.timer);
            }
            this.timer = setTimeout(() => {
                this.loadFavorites();
            }, 100)
        },
        loadFavorites() {
            var cookie, elementsId = [];
            
            if (cookie = this.$cookie.get('favorites'))
                elementsId = JSON.parse(cookie);

            if (this.in_array(this.id,elementsId))
                elementsId.remove(this.id);
            else 
                elementsId.push(this.id);

            this.$cookie.set('favorites', JSON.stringify(elementsId), { expires: '1Y' });
            this.$store.dispatch('catalog/GET_FAVORITES');
            this.$root.$emit('favorites');
        },
        counterMinus() {
            if (this.itemAmount <= 1) {
                return
            } else {
                this.itemAmount--;
            }
        },
    },
    computed: {
        ...mapGetters({
            isFavorites: 'catalog/isFavorites',
        }),
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