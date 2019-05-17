<template>
<nuxt-link
    class="swiper-slide item"
    :to="{path: item.URL}"
>
    <button
        class="item__preview"
        v-if="!wideView"
        @click.prevent="showModal"
    >
        Быстрый просмотр
    </button>
    <div class="item__img">
        <img v-for="(img, index) in item.CURRENT.MORE_PHOTO" :key="index" v-lazy="img"/>
    </div>
    <div class="item__flags">
        <!-- <span v-if="labelNew" class="item__flag left">NEW</span>
        <span v-if="labelSale" class="item__flag right red">SALE</span> -->
        <span class="item__flag left">NEW</span>
        <span class="item__flag right red">SALE</span>
    </div>
    <div
        class="item__offers"
        :class="{'item__offers--wide': wideView}"
        v-for="prop in item.SKU_PROPS"
        :key="prop.ID"
        ref="sku_line_block"
        >
        <p v-if="wideView">{{prop.NAME}}</p>
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

    <div class="item__info">
        <p class="item__name">{{item.CURRENT.NAME}}</p>
        <template
            v-for="(price, index) in item.CURRENT.ITEM_PRICES"
        >   
            <p class="item__price" :key="price.ID">
                {{price.PRINT_RATIO_PRICE}}
            </p>
            <p v-if="labelSale" class="item__old-price" :key="index">{{price.PRINT_BASE_PRICE}}</p>
        </template>
       
        <p class="item__sale">Еще -10% по акции</p>
    </div>
    <div class="item__buttons">
        <button
            class="item__add-to-cart"
            @click.prevent="basket(item.CURRENT.ADD_URL)"
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
</nuxt-link>

</template>

<script>

import offers from '~/mixins/offers.js'
import { mapGetters } from 'vuex'

export default {
    mixins: [offers],
    props: {
        item: Object,
    },
    data() {
      return {
        timer: null,
        id: this.item.ID,
        wideView: false
      }
    },

    methods: {
        async basket(url) {
            let response = await this.$axios.get(`${url}&ajax_basket=Y`);
            this.$store.dispatch('basket/STATE');
        },
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
        }
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