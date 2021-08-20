

<template>
    <nuxt-link
        class="swiper-slide item"
        :class="{'item--wide': wideItem}"
        :to="{path: item.URL}"
    >

        <div class="item__wide-left">
            <div class="item__img">
                <img v-if="item.CURRENT.MORE_PHOTO[0]" :src="item.CURRENT.MORE_PHOTO[0]">
            </div>
            <div class="item__flags">
                <span v-if="labelNew(item)" class="item__flag left">NEW</span>
                <span v-if="labelSale" class="item__flag right red">-{{labelSale}}%</span>
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
                    :rating="rating"
                    inactive-color="#e6e6e6"
                    active-color="#999999"
                    :read-only="true"
                    :show-rating="false"
                    :round-start-rating="false"
                    :star-points="[13.998,4.965, 9.306,4.085, 6.999,0.000, 4.692,4.085, 0.000,4.965, 3.266,8.370, 2.673,12.999, 6.999,11.018, 11.325,12.999, 10.732,8.370]"
                />
                <span v-if="item.DISPLAY_PROPERTIES.BLOG_COMMENTS_CNT">({{item.DISPLAY_PROPERTIES.BLOG_COMMENTS_CNT.value}})</span>
                <span v-else>(0)</span>
            </div>

            <p class="item__name" v-if="wideItem">{{item.CURRENT.NAME}}</p>
            <div class="item__wide-offers" >
                <div  class="item__offers" v-for="propsitm in item.SKU_PROPS" v-bind:key="propsitm">
                <p>{{propsitm.NAME}}</p>
                    <ul v-if="propsitm.NAME=='Цвет'">
                        <li v-for="value in propsitm.VALUES" 
                            v-if="value.ID == item.CURRENT.TREE.PROP_2"
                            v-bind:key="value"
                        >
                        <span>
                            <img  :src="value.PICT.SRC"  :title="value.NAME" />
                        </span>
                        </li>
                    </ul>
                    <ul v-else>
                        <li v-for="value in propsitm.VALUES" v-bind:key="value">
                        <span>
                           {{value.NAME}}
                        </span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="item__wide-bottom">

                <div class="item__info">
                    <p class="item__name" v-if="!wideItem">{{this.item.CURRENT.NAME}}</p>
                    <p style="color: #0B9001; font-weight: bold;" v-if="new String(item.URL).indexOf('linzy-dlya-ochkov') != -1">Цена 2-х линз</p>
                    <template v-for="(price, index) in item.CURRENT.ITEM_PRICES">
                        <p class="item__price" :key="price.ID">{{price.PRINT_RATIO_PRICE}}</p>
                        <p class="item__old-price" v-if="labelSale" :key="index">{{price.PRINT_RATIO_BASE_PRICE}}</p>
                    </template>
<!--                    <p class="item__price">{{item.CURRENT.NAME.ITEM_PRICES[0].PRINT_PRICE}} </p>-->
<!--                    <p class="item__old-price">{{item.CURRENT.NAME.ITEM_PRICES[0].PRINT_BASE_PRICE}}</p>-->
                    <p class="item__sale" v-if="getDiscount() > 0">Еще -{{getDiscount()}}% по акции</p>
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
                        @click.prevent="deleteFromFavorite(item.ID)"
                    >
                        <svg width="17" height="17" fill="#000"><use href="#svg-heart" /></svg>
                        <svg width="16" height="16" fill="#fff"><use href="#svg-heart2" /></svg>
                        В избранное
                    </button>
                    <button
                        class="item__compare"
                        :class="{'active':isCompare(item.ID)}"
                        @click.prevent="addCompare(item.CURRENT.COMPARE_URL)"
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
    import qs from 'qs';
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
            labelNew(item) {
                if (item.PROPERTIES.new && item.PROPERTIES.new.value == "Y")
                    return true;
                return false;
            },
            getDiscount() {
                let discount = false
                //console.log('favorite', this.item)
                for(let i in this.item.PROPERTIES) {
                    if(this.item.PROPERTIES[i].name == "Скидка" && this.item.PROPERTIES[i].value) {
                        discount = this.item.PROPERTIES[i].value
                        break
                    }
                }
                return discount
            },
            roundNum(n) {
                return ""+Math.ceil(parseFloat(n))
            },
            clearNum(n) {
                return new String(n).replace(/\s|руб.*/gi, "")
            },
            isFloat(n){
                let str = new String(n).indexOf('.')
                return str !== -1
            },
            numFormat(n) {
                let num = this.clearNum(n)
                if(this.isFloat(num)) {
                    num = this.roundNum(num)
                }
                if(num.length > 3) {
                    let len = num.length
                    let begin = num.substring(0, len - 3)
                    let finish = num.substring(len - 3)
                    num = begin + " " + finish
                }
                n = num + " руб."
                return n
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
            deleteFromFavorite($id)
            {
                let cookie, elementsId = [], favorCookie, offersFavotites = {};

                if (favorCookie = localStorage.getItem('favoritesOffers'))
                    offersFavotites = JSON.parse(favorCookie);

                delete offersFavotites[$id];

                if (cookie = localStorage.getItem('favorites'))
                    elementsId = JSON.parse(cookie);
                //console.log('favor_id', $id)
                //console.log('favor_arr', elementsId)
                for(let i in elementsId) {
                    if(elementsId[i] == $id) {
                        elementsId.splice(i, 1)
                        localStorage.setItem('favoritesOffers', JSON.stringify(offersFavotites));
                        localStorage.setItem('favorites', JSON.stringify(elementsId));
        
                        this.$store.dispatch('catalog/GET_FAVORITES');
                        this.$root.$emit('favorites');
                        break;
                    }
                }
            },
            counterMinus() {
                if (this.itemAmount <= 1) {
                    return
                } else {
                    this.itemAmount--;
                }
            },
        },
        beforeMount() {
            var URL=this.item.URL;
            let item = this.item.JS_OFFERS;
            let cookieOffers = JSON.parse(localStorage.getItem('favoritesOffers'));
            for(let values of item) {
                if (values.ID == cookieOffers[this.item.ID]) {
                    //console.log(values);
                    this.item.CURRENT = values;
                }
                // console.log(values);
                // console.log(cookieOffers);
                // console.log(values.ID);
            }
            //console.log(this.item);
        },
        filters: {
            format(value) {
                return value.toString().replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
            },
        },
        computed: {
            ...mapGetters({
                isFavorites: 'catalog/isFavorites',
                isCompare: 'catalog/isCompare'
            }),
            rating() {
                if (this.item.DISPLAY_PROPERTIES.rating)
                    return this.item.DISPLAY_PROPERTIES.rating.value*1;
                return 0;
            },
            labelSale() {
                for (let key in this.item.CURRENT.ITEM_PRICES) {
                    if (this.item.CURRENT.ITEM_PRICES[key].DISCOUNT)
                        return this.item.CURRENT.ITEM_PRICES[key].PERCENT;
                }
                return false;
            }
        },
    }
</script>
