<template>
<nuxt-link
    class="swiper-slide item"   
    :class="{'item--wide': wideItem}"
    :to="{path: item.URL}" 
   
>   
    <div class="item__wide-left" >
        <div class="item_img" v-bind:style="{backgroundImage:
            'url(https://home-optic.ru' + item.CURRENT.MORE_PHOTO[newIndex] + ')'}" 
                             
        >           
            <div class="new__image"
                v-show="item.CURRENT.MORE_PHOTO.length>1"                         
                v-for="(img, index) in item.CURRENT.MORE_PHOTO" :key="index"
                v-on:mouseover.prevent="showNew(index)"                           
            />                      
        </div>      
        <b-carousel 

          id="carousel-15"           
          :interval="40000"
          :indicators="item.CURRENT.MORE_PHOTO.length>1"         
          class="slider-mobile"
          background="#fff"          
        >
          <b-carousel-slide  :key="index" v-for="(img, index) in item.CURRENT.MORE_PHOTO" >
            <template>              
            <img
                alt="new img"                       
                :src="'https://home-optic.ru' + img"
            />
            </template>                   
          </b-carousel-slide>               
        </b-carousel>       
        
        <div class="item__flags">
            <span v-if="labelNew" class="item__flag left">NEW</span>
            <span v-if="labelSale" class="item__flag right red">-{{labelSale}}%</span>
        </div>
        <div class="counter" v-if="wideItem" @click.prevent>
            <button @click="counterMinus">-</button>
            <the-mask mask="FFF" :tokens="regxNumbers" v-model="itemAmount"/>
            <button @click="itemAmount++">+</button>
        </div>
    </div>
    <button
        class="item__preview"
        v-if="!wideItem"
        @click.prevent="showModal"
    >
        Быстрый просмотр
    </button>
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
        <div class="item__wide-offers">
            <div
                class="item__offers"
                v-for="prop in sortPropsSku"
                :key="prop.ID"
                ref="sku_line_block"
            >
                <p v-if="wideItem">{{prop.NAME}}</p>
                <ul>
                    <li
                        :data-value="value.ID"
                        :data-color="value.XML_ID"
                        @click.prevent="selectOfferProp(prop.ID, value.ID, $event)"
                        v-for="value in prop.VALUES"
                        :key="value.ID"
                        :class="{'img': (value.PICT && value.PICT.ID !== 0)}"
                    >
                        <img v-if="value.PICT && value.PICT.ID !== 0" :src="'https://home-optic.ru' + value.PICT.SRC" alt="" :title="value.NAME">
                        <span v-if="!value.PICT || value.PICT.ID == 0">{{value.NAME}}</span>

                    </li>
                </ul>
            </div>
        </div>
        <div class="item__wide-bottom">
            <div class="item__info">
                <p class="item__name" v-if="!wideItem">{{item.CURRENT.NAME}}</p>
                <p style="color: #0B9001; font-weight: bold;" v-if="new String(item.URL).indexOf('linzy-dlya-ochkov') != -1">Цена 2-х линз</p>
                <template v-for="(price, index) in item.CURRENT.ITEM_PRICES">
                    <p class="item__price" :key="price.ID">{{numFormat(price.PRINT_RATIO_PRICE)}}</p>
                    <p class="item__old-price" v-if="labelSale" :key="index">{{numFormat(price.PRINT_RATIO_BASE_PRICE)}}</p>
                </template>
                <p class="item__sale" 
                    v-if="getDiscount() > 0"
                    v-bind:style="{width:wideItem?'100%':'80%'}"
                >Еще -{{getDiscount()}}% по акции</p>
            </div>
            <div class="item__buttons">
                <div class="counter" v-if="wideItem && !item.PROPERTIES.lins" @click.prevent>
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
                    @click.prevent="clickFavorites(item)"
                >
                    <svg width="17" height="17" fill="#000"><use href="#svg-heart" /></svg>
                    <svg width="16" height="16" fill="#fff"><use href="#svg-heart2" /></svg>
                    В избранное
                </button>
                <button
                    class="item__compare"
                     :class="{'active':isCompare(item.CURRENT.ID)}"
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

import offers from '~/mixins/offers.js'
import item from '~/mixins/item.js'
import { mapGetters } from 'vuex'

import Star from '~/components/catalog/star/star.vue'

export default {
    mixins: [offers, item],
 
    props: {
        item: Object,
        filter: Object,
        wideItem: {
            type: Boolean,
            default: () => false,
        }
    },
    data() {
        return {     
            newIndex: 0,
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
        // selectedProp(prop) {
        //     console.log('prop', prop);
        //     console.log('filter', this.filter);
        //     console.log('data', this);
        //     return false;
        // },
        showNew(a) {
            this.newIndex = a;
        },
        getDiscount() {
          let discount = false
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
        updateElement(url) {
            //console.log(url);
            var newWin = window.open(url, "hello", "width=800,height=600");           
        },
        showModal() {
            this.$root.$emit('preview', this.item);
        },
        clickFavorites(item) {
            if (!!this.timer)
            {
                clearTimeout(this.timer);
            }
            this.timer = setTimeout(() => {
                this.loadFavorites(item);
            }, 100)
        },
        loadFavorites(item) {
            //console.log('favorite', item)
            let cookie, elementsId = [], favorCookie, offersFavotites = {};

            if (favorCookie = localStorage.getItem('favoritesOffers'))
                offersFavotites = JSON.parse(favorCookie);

            if (offersFavotites[item.ID] === undefined )
                offersFavotites[item.ID] = item.ID;
            else
                delete offersFavotites[item.ID];

            if (cookie = localStorage.getItem('favorites'))
                elementsId = JSON.parse(cookie);

            if (this.in_array(item.ID,elementsId))
                elementsId.remove(item.ID);
            else
                elementsId.push(item.ID);

            localStorage.setItem('favoritesOffers', JSON.stringify(offersFavotites));
            console.log(offersFavotites);
            localStorage.setItem('favorites', JSON.stringify(elementsId));

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
     
       
        sortPropsSku() {
            var properties = Object.assign({}, this.item.SKU_PROPS),
                array = [];
           
            for(let i in properties) {
                array.push(properties[i]);
            }

            array.sort(function(a, b) {
                if (a.SORT > b.SORT) return 1
                if (a.SORT == b.SORT) return 0
                if (a.SORT < b.SORT) return -1
            })


            return array;
        },
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
            //var selectedPrice = this.item.CURRENT.ITEM_PRICE_SELECTED;
            let $ok = false
            try {
                if(this.item.CURRENT.ITEM_PRICES[0].RATIO_BASE_PRICE > this.item.CURRENT.ITEM_PRICES[0].PRICE) 
                   $ok = true 
            } catch(e){}
            if($ok)
                return this.item.CURRENT.ITEM_PRICES[0].PERCENT;
            // if (this.item.CURRENT.ITEM_PRICES[selectedPrice].RATIO_DISCOUNT != 'undefined')
            //     return true;
            return false;
        }
    },
}
</script>
<style scoped>
.slider-mobile {
    display: none;
}
.item {
    padding: 0;
}
.item_img {
    height: 280px;
    text-align: center;
    background-position: center 40%;
    background-size: 75%;
    background-repeat: no-repeat;
}
.item__preview {
    top: 210px;
}
.item__wide-bottom {
    margin-top: 30px;
}
.item__wide-left {
    height: 250px;
    margin-bottom: 5px;
}
.item__wide-right {
    margin: 10px 0;
}
.item__wide-left:hover .new__image {
   border-bottom: 3px solid rgba(0,0,0,.3);
}
.new__image {
    display: inline-block;
    width: 13.5%;
    margin: 0.5%;    
    height: 200px;
    z-index: 10;
    border-bottom: 3px solid rgba(0,0,0,.0);
}
.new__image:hover {
    border-bottom: 3px solid rgba(0,0,0,.8) !important;
}
.item__sale {
    background: red;
    color: #fff;   
    margin: 5px auto;
    padding: 1px 15px;
    display: block
}
@media(max-width: 700px) {
    .item {
        width: 50%;
    }
    .item__wide-left {
        height: auto !important;
        /* margin: 30px 0 5px; */
    }
    .card__img {
        width: 60% !important;
        margin: 0 auto !important;
    }
    #carousel-15 .carousel-indicators {
        width: 68% !important;
        padding: 0 ;
        bottom: -15px !important;
    }
}
@media(max-width: 600px) {
    .carousel-indicators li {
        width: 10% !important;
    }
    .item__add-to-cart:not(:last-of-type),
    .item__favorite:not(:last-of-type) {
        margin-right: 3px;
    }
    .item__add-to-cart {
        min-width: 80px;
        padding: 0;
    }   
    .item_img {
        display: none;
    }
    .new__image {
       border-bottom: 3px solid rgba(0,0,0,.3);
    }
    .slider-mobile {
        display: inline-block;
        width: 100%;
    }
    .carousel img {
        width: 50%;
        height: auto;
        margin: 9px auto 0;
    }
    .carousel {
        width: 100%;
    }
   
    .catalog__items .item__flags {
        max-width: 275px !important;
       
    }    
};    
</style>
