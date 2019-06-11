<template>
<nuxt-link
    class="swiper-slide item"
    :class="{'item--wide': wideItem}"
    :to="{path: item.URL}"
>
    <div class="item__wide-left">
        <div class="item__img">
            <img alt="" v-lazy="item.IMAGE">
        </div>
        <div class="item__flags">
            <!-- <span v-if="labelNew" class="item__flag left">NEW</span> -->
            <span v-if="labelSale" class="item__flag right red">SALE</span>
        </div>
        <div class="counter" v-if="wideItem" @click.prevent>
            <button @click="counterMinus">-</button>
            <the-mask mask="FFF" :tokens="regxNumbers" v-model="itemAmount"/>
            <button @click="itemAmount++">+</button>
        </div>
    </div>
    <div class="item__wide-right">
        <div class="item__rating" v-if="wideItem" @click.prevent>
            <star
                class="rating"
                @rating-selected="setReting"
                inactive-color="#e6e6e6"
                active-color="#999999"
                :read-only="true"
                :show-rating="false"
                :round-start-rating="false"
                :star-points="[13.998,4.965, 9.306,4.085, 6.999,0.000, 4.692,4.085, 0.000,4.965, 3.266,8.370, 2.673,12.999, 6.999,11.018, 11.325,12.999, 10.732,8.370]"
            />
            <span>(35)</span>
        </div>
        <p class="item__name" v-if="wideItem">{{item.NAME}}</p>
        <div class="item__wide-offers">
            <div
                class="item__offers"
                v-for="(prop, index) in item.OFFER_DISPLAY_PROPERTIES"
                :key="index"
            >
                <p>{{prop.name}}</p>
                <ul>
                    <li>
                        <span>{{prop.value}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="item__wide-bottom">
            
            <div class="item__info">
                <p class="item__name" v-if="!wideItem">{{item.NAME}}</p>
                <template v-for="(price, index) in item.PRICES">
                    <p class="item__price" :key="price.ID">{{price.PRINT_DISCOUNT_VALUE}}</p>
                    <p class="item__old-price" v-if="labelSale" :key="index">{{price.PRINT_VALUE}}</p>
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
                    @click.prevent="addToBasket(item.ADD_URL)"
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
                <button 
                    class="item__compare" 
                     :class="{'active':isCompare(item.ID)}"
                    @click.prevent="addCompare(item.COMPARE_URL)"
                >
                    <svg width="18" height="18" fill="#000"><use href="#svg-compare" /></svg>
                    В сравнение
                </button>
            </div>
        </div>
    </div>

</nuxt-link>
</template>

<script>

import item from '~/mixins/item.js'
import util from '~/mixins/util.js'
import { mapGetters } from 'vuex'

import Star from '~/components/catalog/star/star.vue'

export default {
    mixins: [item,util],
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
            rating: 4.4,
            regxNumbers: {
                F: {
                    pattern: /[0-9]/,
                },
            },
        }
    },
    components: {
        Star,
    },
    methods: {
        setReting(value) {
            console.log(value);
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
            isCompare: 'catalog/isCompare'
        }),
        labelSale() {
            for (let key in this.item.PRICES) {
                if (this.item.PRICES[key].DISCOUNT_DIFF)
                    return true;
            }
            return false;
        }
    },
}
</script>
