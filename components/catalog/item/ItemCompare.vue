<template>
<nuxt-link
    class="swiper-slide item"
    :class="{'item--wide': wideItem}"
    :to="{path: item.URL}"
>

    <div class="item__wide-left">
        <div class="item__img">
            <img alt="" :src="item.IMAGE">
        </div>
        <div class="item__flags">
            <span v-if="labelNew(item)" class="item__flag left">NEW</span>
            <span v-if="labelSale > 0" class="item__flag right red">-{{labelSale}}%</span>
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

        <p class="item__name" v-if="wideItem">{{item.NAME}}</p>
        <div class="item__wide-offers">
            <div
                class="item__offers"
                v-for="(prop, index) in item.OFFER_DISPLAY_PROPERTIES"
                :key="index"
            >
                <template v-if="prop.name === 'Цвет'">
                <p >{{prop.name}}</p>
                <ul>
                    <li>
                        <span v-if="prop.value==='Черный'"><img alt="" title="Черный" data-src="/upload/uf/141/141c8dec715ce0aa08456898eeb2dd84.jpg" src="/upload/uf/141/141c8dec715ce0aa08456898eeb2dd84.jpg" lazy="loaded"></span>
                        <span v-else-if="prop.value==='Фиолетовый'"><img alt="" title="Фиолетовый" data-src="/upload/uf/feb/febd5016fac21c1e696243707497bc14.jpg" src="/upload/uf/feb/febd5016fac21c1e696243707497bc14.jpg" lazy="loaded"></span>
                        <span v-else-if="prop.value==='Сиреневый'"><img alt="" title="Сиреневый" data-src="/upload/uf/b96/b962988685dfb37c0f8059ca67af712a.jpg" src="/upload/uf/b96/b962988685dfb37c0f8059ca67af712a.jpg" lazy="loaded"></span>
                        <span v-else-if="prop.value==='Синий'"><img alt="" title="Синий" data-src="/upload/uf/67b/67b5c056c948a2b2690cd6d98236971a.jpg" src="/upload/uf/67b/67b5c056c948a2b2690cd6d98236971a.jpg" lazy="loaded"></span>
                        <span v-else-if="prop.value==='Серый'"><img alt="" title="Серый" data-src="/upload/uf/106/10692c7e11a02ff0d3243454a6c92377.jpg" src="/upload/uf/106/10692c7e11a02ff0d3243454a6c92377.jpg" lazy="loaded"></span>
                        <span v-else-if="prop.value==='Серебристый'"><img alt="" title="Серебристый" data-src="/upload/uf/b76/b7696fb44e05e2264d61c8c2259e6f1c.jpg" src="/upload/uf/b76/b7696fb44e05e2264d61c8c2259e6f1c.jpg" lazy="loaded"></span>
                        <span v-else-if="prop.value==='Салатовый'"><img alt="" title="Салатовый" data-src="/upload/uf/3e0/3e016802b806ec49632bb48fbfe95de6.jpg" src="/upload/uf/3e0/3e016802b806ec49632bb48fbfe95de6.jpg" lazy="loaded"></span>
                        <span v-else-if="prop.value==='Розовый'"><img alt="" title="Розовый" data-src="/upload/uf/051/051b7f607170fa3937470c79438d10d0.jpg" src="/upload/uf/051/051b7f607170fa3937470c79438d10d0.jpg" lazy="loaded"></span>
                        <span v-else-if="prop.value==='Прозрачный'"><img alt="" title="Прозрачный" data-src="/upload/uf/f7a/f7ae98c2c5c14207817b554a147fa671.jpg" src="/upload/uf/f7a/f7ae98c2c5c14207817b554a147fa671.jpg" lazy="loaded"></span>
                        <span v-else-if="prop.value==='Оранжевый'"><img alt="" title="Оранжевый" data-src="/upload/uf/42d/42d3719787bab9122223e01a3178dfd4.jpg" src="/upload/uf/42d/42d3719787bab9122223e01a3178dfd4.jpg" lazy="loaded"></span>
                        <span v-else-if="prop.value==='Оливковый'"><img alt="" title="Оливковый" data-src="/upload/uf/e08/e08958811079f11c79b0a7af3807cb7f.jpg" src="/upload/uf/e08/e08958811079f11c79b0a7af3807cb7f.jpg" lazy="loaded"></span>
                        <span v-else-if="prop.value==='Красный'"><img alt="" title="Красный" data-src="/upload/uf/16b/16b3d0feb9273f4f6bff8a161655f2c5.jpg" src="/upload/uf/16b/16b3d0feb9273f4f6bff8a161655f2c5.jpg" lazy="loaded"></span>
                        <span v-else-if="prop.value==='Коричневый'"><img alt="" title="Коричневый" data-src="/upload/uf/d8a/d8af1e7e1037e24e9e4ee6cf48a8b142.jpg" src="/upload/uf/d8a/d8af1e7e1037e24e9e4ee6cf48a8b142.jpg" lazy="loaded"></span>
                        <span v-else-if="prop.value==='Коралловый'"><img alt="" title="Коралловый" data-src="/upload/uf/027/027e9f9281ddac550f8732784c56eb2d.jpg" src="/upload/uf/027/027e9f9281ddac550f8732784c56eb2d.jpg" lazy="loaded"></span>
                        <span v-else-if="prop.value==='Коралловый'"><img alt="" title="Золотистый" data-src="/upload/uf/027/027e9f9281ddac550f8732784c56eb2d.jpg" src="/upload/uf/027/027e9f9281ddac550f8732784c56eb2d.jpg" lazy="loaded"></span>
                        <span v-else-if="prop.value==='Зелёный'"><img alt="" title="Зелёный" data-src="/upload/uf/49a/49a2b39aeb4311f85a1cb89c417ef3c7.jpg" src="/upload/uf/49a/49a2b39aeb4311f85a1cb89c417ef3c7.jpg" lazy="loaded"></span>
                        <span v-else-if="prop.value==='Голубой'"><img alt="" title="Голубой" data-src="/upload/uf/c84/c8400a822c0b5cc61b85299d4de635a1.jpg" src="/upload/uf/c84/c8400a822c0b5cc61b85299d4de635a1.jpg" lazy="loaded"></span>
                        <span v-else-if="prop.value==='Бронзовый'"><img alt="" title="Бронзовый" data-src="/upload/uf/263/263f987ae502bd3f3dfbd89343f30a65.jpg" src="/upload/uf/263/263f987ae502bd3f3dfbd89343f30a65.jpg" lazy="loaded"></span>
                        <span v-else-if="prop.value==='Бордовый'"><img alt="" title="Бордовый" data-src="/upload/uf/7f2/7f2817e640a5793af7d142f19b5daa5f.jpg" src="/upload/uf/7f2/7f2817e640a5793af7d142f19b5daa5f.jpg" lazy="loaded"></span>
                        <span v-else-if="prop.value==='Бирюзовый'"><img alt="" title="Бирюзовый" data-src="/upload/uf/b55/b55c023314100775872f8cb61359ec84.jpg" src="/upload/uf/b55/b55c023314100775872f8cb61359ec84.jpg" lazy="loaded"></span>
                        <span v-else-if="prop.value==='Белый'"><img alt="" title="Белый" data-src="/upload/uf/556/55652dcc8c349c336e76a04900b03e87.jpg" src="/upload/uf/556/55652dcc8c349c336e76a04900b03e87.jpg" lazy="loaded"></span>
                        <span v-else-if="prop.value==='Бежевый'"><img alt="" title="Бежевый" data-src="/upload/uf/dee/deebf97f7a794ffa9850e0cc3f741371.jpg" src="/upload/uf/dee/deebf97f7a794ffa9850e0cc3f741371.jpg" lazy="loaded"></span>
                    </li>
                </ul>
                </template>

            </div>

            <div
                    class="item__offers"
                    v-for="(prop, index) in item.OFFER_DISPLAY_PROPERTIES"
                    :key="index"
            >
                <template v-if="prop.name === 'Размер'">
                    <p >{{prop.name}}</p>

                    <ul>
                    <li>
                        <span >{{prop.value}}</span>
                    </li>
                    </ul>
                </template>

            </div>
        </div>
        <div class="item__wide-bottom">

            <div class="item__info">
                <p class="item__name" v-if="!wideItem">{{item.NAME}}</p>
                <p style="color: #0B9001; font-weight: bold;" v-if="new String(item.URL).indexOf('linzy-dlya-ochkov') != -1">Цена 2-х линз</p>
                <template v-for="(price, index) in item.PRICES">
                    <template>
                        <p class="item__price" :key="price.ID">{{numFormat(price.PRINT_DISCOUNT_VALUE)}} </p>
                        <p class="item__old-price" v-if="labelSale" :key="index">{{numFormat(price.PRINT_VALUE)}}</p>
                    </template>
                </template>
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
            //console.log(item)
                if (item.PROPERTIES.new && item.PROPERTIES.new.value == "Y")
                    return true;
                return false;
            },
        getDiscount() {
            let discount = false
            //console.log('compare', this.item)
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
            if(new String(this.item.URL).indexOf('linzy-dlya-ochkov') != -1) num = num * 2
            num = new String(num)
            if(num.length > 3) {
                let len = num.length
                let begin = num.substring(0, len - 3)
                let finish = num.substring(len - 3)
                num = begin + "  " + finish
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
        counterMinus() {
            if (this.itemAmount <= 1) {
                return
            } else {
                this.itemAmount--;
            }
        },
    },
    beforeMount() {
        // var URL=this.item.URL;
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
            for (let key in this.item.PRICES) {
                if (this.item.PRICES[key].DISCOUNT_DIFF)
                    return this.item.PRICES[key].DISCOUNT_DIFF_PERCENT;
            }
            return false;
        }
    },
}
</script>
<style scoped>
    .item__sale {
        background: red;
        color: #fff;
    }
</style>
