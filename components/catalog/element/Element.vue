<template>
<div class="card main-container">
    <div class="card__top">
        <div class="card__img">
            <img alt="" v-for="(img, index) in item.CURRENT.MORE_PHOTO" :key="index" v-lazy="img">
            <div class="item__flags">
                <span v-if="labelNew" class="item__flag left">NEW</span>
                <span v-if="labelSale" class="item__flag right red">SALE</span>
            </div>
        </div>
        <div class="card__info">
            <share customClass="card__social"/>
            <p v-if="item.DISPLAY_PROPERTIES.articul" class="card__article">Артикул: {{item.DISPLAY_PROPERTIES.articul.VALUE}}</p>
            <div class="card__rating">
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
                <span v-if="item.DISPLAY_PROPERTIES.BLOG_COMMENTS_CNT" class="card__replies">{{item.DISPLAY_PROPERTIES.BLOG_COMMENTS_CNT.VALUE}} отзывов</span>
                <span v-else>(0)</span>
                <button type="button" v-scroll-to="'#cardTabs'" @click="addFeedback">Добавить отзыв</button>
            </div>
            <div class="card__available">
                <span>
                    <svg width="15" height="15" fill="#000"><use href="#svg-layers"/></svg>
                    Доступно Много
                </span>
                <button @click="addCompare(item.CURRENT.COMPARE_URL)">
                    <svg width="15" height="15" fill="#000"><use href="#svg-compare2"/></svg>
                    Добавить к сравнению
                </button>
            </div>
            <div class="card__offers" v-if="item.SKU_PROPS">
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
                            :class="{'img': (value.PICT && value.PICT.ID !== 0)}"
                        >
                            <img v-if="value.PICT && value.PICT.ID !== 0" :src="value.PICT.SRC" alt="" :title="value.NAME">
                            <span v-if="!value.PICT || value.PICT.ID == 0">{{value.NAME}}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="card__lense-production-wrapper" v-if="itsaLense">
                <div class="card__lense-production">
                    <p>Линзы изготавливаются на заказ.</p>
                    <p>Срок изготовления 10 рабочих дней.</p>
                </div>
            </div>
            <div class="card__guarantee">
                <p>Гарантируем лучшую цену! Нашли дешевле? Снизим цену</p>
                <p>
                    Дополнительная <span>10% скидка по промокоду</span> <br>
                    при изготовлении очков в нашей мастерской или при заказе онлайн.
                </p>
            </div>
        </div>
    </div> 
    <div class="card__price">
        <div class="card__price-inner"> 
            <h3>Цена</h3>
            <template v-for="(price, index) in item.CURRENT.ITEM_PRICES">
                <p class="card__old-price" v-if="labelSale" :key="index">{{price.PRINT_BASE_PRICE}}</p>
                <p class="card__current-price" :key="price.ID">{{price.PRINT_RATIO_PRICE}}</p>
            </template>
            <div class="card__counter counter">
                <button @click="counterMinus">-</button>
                <the-mask mask="FFF" :tokens="regxNumbers" v-model="itemAmount"/>
                <button @click="itemAmount++">+</button>
            </div>
            <button class="card__promo-btn" @click="promo.shown = !promo.shown">Доп скидка 10% по промокоду</button>
            <button class="card__add-to-cart button black" @click="addToBasket(item.CURRENT.ADD_URL, $refs.form_props)">В корзину</button>
        </div>
        <div class="card__promo" v-show="promo.shown == true">
            <span>{{sale}} руб.</span>
            <p>Цена с доп. скидкой 10% по промокоду <b>HOMEOPTIC</b></p>
            <button
                class="button black"
                type="button"
                v-if="!isCoupon('homeoptic')"
                @click="coupon"
            >
                Применить купон в корзине
            </button>
            <p v-if="isCoupon('homeoptic')">Купон применён</p>
            <button class="card__promo-close" @click="promo.shown = false">Закрыть</button>
        </div>
        <button class="card__buy-one-click button">
            <svg width="22" height="22" fill="#000"><use href="#svg-click"/></svg>
            Купить в один клик
        </button>
    </div>
   
    <form ref="form_props" class="card__lense-form" v-if="itsaLense">
        <div class="card-lense">
            <p class="card-lense__heading">Выберите параметры Вашего  зрения, и мы подберем для Вас наилучший вариант линз:</p>
            <div class="card-lense__lense" v-for="lense in ['right', 'left']" :key="lense">
                <div class="card-lense__img" v-if="lense == 'right'">
                    <span>Правая линза (OD)</span>
                    <img src="~assets/images/card/lense-right.png" alt="">
                </div>
                <div class="card-lense__img" v-else>
                    <span>Левая линза (OD)</span>
                    <img src="~assets/images/card/lense-left.png" alt="">
                </div>
                <div class="card-lense__props">
                    <div class="card-lense__prop">
                        <span>Сфера (sph)</span>
                        <select :name="lense+'-sph'">
                            <option
                                :selected="(16.25 - value*0.25).toFixed(2) == '0.00'"
                                v-for="value in 129"
                                :key="value"
                                :value="((value > 64) ? '' : '+') + (16.25 - value*0.25).toFixed(2)">
                                {{((value > 64) ? '' : '+') + (16.25 - value*0.25).toFixed(2) + ' дпт.'}}
                            </option>
                        </select>
                    </div>
                    <div class="card-lense__prop">
                        <span>Цилиндр (cyl)</span>
                        <select :name="lense+'-cyl'">
                            <option
                                :selected="(4.25 - value*0.25).toFixed(2) == '0.00'"
                                v-for="value in 33"
                                :key="value"
                                :value="((value > 16) ? '' : '+') + (4.25 - value*0.25).toFixed(2)">
                                {{((value > 16) ? '' : '+') + (4.25 - value*0.25).toFixed(2) + ' дпт.'}}
                            </option>
                        </select>
                    </div>
                    <div class="card-lense__prop">
                        <span>Аксис (ax)</span>
                        <select :name="lense+'-ax'">
                            <option value="0.00" selected>0°</option>
                            <option
                                v-for="value in 180"
                                :key="value"
                                :value="value">
                                {{ value + '°' }}
                            </option>
                        </select>
                    </div>
                    <div class="card-lense__prop" v-if="officeLenses">
                        <span>Аддидация (add)</span>
                        <select :name="lense+'-add'">
                            <option value="0.00" selected>0.00 дпт.</option>
                            <option
                                v-for="value in 16"
                                :key="value"
                                :value="(value*0.25).toFixed(2)">
                                {{(value*0.25).toFixed(2) + ' дпт.'}}
                            </option>
                        </select>
                    </div>
                    <div class="card-lense__prop" v-if="progressiveLenses || accomodationLenses">
                        <span>Дегрессия (deg)</span>
                        <select :name="lense+'-deg'">
                            <option value="0.00" selected>0.00 дпт.</option>
                            <option
                                v-for="value in 16"
                                :key="value"
                                :value="(value*0.25).toFixed(2)">
                                {{(value*0.25).toFixed(2) + ' дпт.'}}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="card-lense__btns">
                <p class="card-lense__recipe" v-if="noRecipe">Не волнуйтесь и продолжайте оформлять заказ! Мы с вами свяжемся для уточнения параметров линз.</p>
                <label class="button card-lense__upload-recipe" v-else>
                    <input type="file" name="lense-recepite" hidden>
                    Загрузить рецепт »
                </label>
                <label class="checkbox">
                    <input type="checkbox" name="no-recipe" v-model="noRecipe">
                    <i class="checkbox__indicator"></i>
                    Я не знаю своего рецепта
                </label>
            </div>
        </div>
        <div class="card-workshop">
            <label class="card-workshop__top checkbox">
                <input type="checkbox" name="order-workshop" v-model="orderWorkshop">
                <i class="checkbox__indicator"></i>
                <p>Закажите работу оптической мастерской по обработке и установке линз в оправу</p>
                <img src="~assets/images/card/workshop.png" alt="">
            </label>
            <div v-show="orderWorkshop">
                <div class="card-workshop__option">
                    <p class="card-workshop__option-name">Межцентровое расстояние РЦ (PD):</p>
                    <label class="checkbox">
                        <input type="checkbox" name="center-distance" v-model="centerDistance">
                        <i class="checkbox__indicator" :class="{'error':centerDistanceError}"></i>
                        <span>Мое межцентровое расстояние</span>
                        <div class="card-lense__prop">
                            <select name="center-distance-right" :disabled="!centerDistance">
                                <option value="-" selected>Правый</option>
                                <option
                                    v-for="(value, index) in 53"
                                    :key="index"
                                    :value="(24.75 + value*0.25).toFixed(2)">
                                    {{(24.75 + value*0.25).toFixed(2) + ' мм'}}
                                </option>
                            </select>
                            <select name="center-distance-left" :disabled="!centerDistance">
                                <option value="-" selected>Левый</option>
                                <option
                                    v-for="(value, index) in 53"
                                    :key="index"
                                    :value="(24.75 + value*0.25).toFixed(2)">
                                    {{(24.75 + value*0.25).toFixed(2) + ' мм'}}
                                </option>
                            </select>
                        </div>
                        <div class="checkbox__bg"></div>
                    </label>
                </div>
                <div class="card-workshop__option">
                    <p class="card-workshop__option-name">Стоимость устоновки линз:</p>
                    <label class="radio">
                        <input type="radio" name="workshop-lense" value="OB">
                        <i class="radio__indicator"></i>
                        <span>Установка линз "Ободковая"</span>
                        <div class="card-workshop__info">
                            <img src="~assets/images/card/workshop-obodkovaya.png" alt="">
                            <span>+590 Р</span>
                        </div>
                        <div class="checkbox__bg"></div>
                    </label>
                    <label class="radio">
                        <input type="radio" name="workshop-lense" value="POB">
                        <i class="radio__indicator"></i>
                        <span>Установка линз "Полуободковая"</span>
                        <div class="card-workshop__info">
                            <img src="~assets/images/card/workshop-poluobodkovaya.png" alt="">
                            <span>+690 Р</span>
                        </div>
                        <div class="checkbox__bg"></div>
                    </label>
                    <label class="radio">
                        <input type="radio" name="workshop-lense" value="BO">
                        <i class="radio__indicator"></i>
                        <span>Установка линз "Безободковая"</span>
                        <div class="card-workshop__info">
                            <img src="~assets/images/card/workshop-bezobodkovaya.png" alt="">
                            <span>+990 Р</span>
                        </div>
                        <div class="checkbox__bg"></div>
                    </label>
                </div>
            </div>
        </div>
    </form>
    <card-tabs class="card__tabs" :element_id="item.ID" :properties="item.DISPLAY_PROPERTIES" :description="item.DETAIL_TEXT" id="cardTabs"/>
    <ul class="card__usp">
        <li class="card__usp-item">
            <i></i>
            <span>Вышлем товар через 1 день</span>
        </li>
        <li class="card__usp-item">
            <i></i>
            <span>Звоните для большей информации</span>
        </li>
        <li class="card__usp-item">
            <i></i>
            <span>Возврат денег гарантирован</span>
        </li>
    </ul>

    <div style="display: none;">
        <svg id="svg-click"
            version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512.043 512.043" xml:space="preserve">
            <path d="M444.902,365.824L231.569,152.491c-3.072-3.029-7.637-3.968-11.627-2.304c-3.989,1.643-6.592,5.547-6.592,9.856v295.381 c0,4.075,2.325,7.787,5.995,9.579c3.669,1.792,8.043,1.344,11.221-1.173l54.165-42.347l47.275,85.077 c1.963,3.499,5.589,5.483,9.344,5.483c1.6,0,3.243-0.363,4.779-1.131l64-32c2.603-1.301,4.565-3.605,5.419-6.379 c0.853-2.795,0.533-5.803-0.853-8.341l-44.544-80.149h67.2c4.309,0,8.192-2.603,9.856-6.592 C448.87,373.461,447.953,368.875,444.902,365.824z M352.038,362.731c-3.776,0-7.275,2.005-9.195,5.269 c-1.92,3.243-1.984,7.275-0.149,10.581l47.936,86.251l-44.907,22.464l-48.363-87.083c-1.515-2.731-4.16-4.672-7.211-5.291 c-0.725-0.149-1.429-0.213-2.133-0.213c-2.347,0-4.693,0.789-6.571,2.261l-46.763,36.565V185.792l176.939,176.939H352.038z"/>
            <path d="M224.017,0c-5.888,0-10.667,4.779-10.667,10.667v64c0,5.888,4.779,10.667,10.667,10.667s10.667-4.779,10.667-10.667v-64 C234.683,4.779,229.905,0,224.017,0z"/>
            <path d="M138.683,149.333h-64c-5.888,0-10.667,4.779-10.667,10.667s4.779,10.667,10.667,10.667h64 c5.888,0,10.667-4.779,10.667-10.667S144.571,149.333,138.683,149.333z"/>
            <path d="M373.35,149.333h-64c-5.888,0-10.667,4.779-10.667,10.667s4.779,10.667,10.667,10.667h64 c5.888,0,10.667-4.779,10.667-10.667S379.238,149.333,373.35,149.333z"/>
            <path d="M171.217,92.117l-45.269-45.248c-4.16-4.16-10.923-4.16-15.083,0c-4.16,4.16-4.16,10.923,0,15.083l45.269,45.248 c2.091,2.069,4.821,3.115,7.552,3.115c2.731,0,5.461-1.024,7.531-3.115C175.377,103.04,175.377,96.277,171.217,92.117z"/>
            <path d="M171.217,212.821c-4.16-4.16-10.923-4.16-15.083,0l-45.269,45.248c-4.16,4.16-4.16,10.923,0,15.083 c2.091,2.069,4.821,3.115,7.552,3.115s5.461-1.045,7.531-3.115l45.269-45.248C175.377,223.744,175.377,216.981,171.217,212.821z"/>
            <path d="M337.169,46.869c-4.16-4.181-10.923-4.181-15.104,0l-45.269,45.248c-4.16,4.16-4.16,10.923,0,15.083 c2.091,2.069,4.821,3.115,7.552,3.115c2.731,0,5.461-1.024,7.552-3.115l45.269-45.248 C341.329,57.792,341.329,51.051,337.169,46.869z"/>
        </svg>
    </div>
</div>
</template>

<script>

import Share from '~/components/share.vue'
import offers from '~/mixins/offers.js'
import item from '~/mixins/item.js'
import Star from '~/components/catalog/star/star.vue'
import CardTabs from '~/components/catalog/element/CardTabs.vue'
import { mapGetters } from 'vuex'

export default {
    mixins: [offers, item],
    props: {
        item: Object,
    },
    data() {
        return {
            itemAmount: 1,
            regxNumbers: {
                F: {
                    pattern: /[0-9]/,
                }
            },
            promo: {
                shown: false,
            },
            itsaLense: true,    // показывает блоки если товар - линза (а не оправа)

            // чекбоксы линз:
            noRecipe: false,        // загрузка своего рецепта
            orderWorkshop: false,   // показать окно с мастерской
            centerDistance: false,  // включить селекты в мастерской

            // дополнительные селекты, если линза попадает под одну из категорий:
            officeLenses: true,
            progressiveLenses: false,
            accomodationLenses: false,
            centerDistanceError:false
        }
    },
    components: {
        Star,
        CardTabs,
        Share
    },
    methods: {
        coupon() {
            this.$store.dispatch('basket/ADD_COUPON', 'homeoptic');
        },  
        counterMinus() {
            if (this.itemAmount <= 1) {
                return
            } else {
                this.itemAmount--;
            }
        },
        addFeedback() {
            this.$root.$emit('addFeedback');
        },
    },
    computed: {
        ...mapGetters({
            isCompare: 'catalog/isCompare',
            isCoupon: 'basket/isCoupon'
        }),
        sale() {
            var selectedPrice = this.item.CURRENT.ITEM_PRICE_SELECTED;
            return this.item.CURRENT.ITEM_PRICES[selectedPrice].RATIO_PRICE - this.item.CURRENT.ITEM_PRICES[selectedPrice].RATIO_PRICE * 0.1;
        },
        rating() {
            if (this.item.DISPLAY_PROPERTIES.rating) 
                return this.item.DISPLAY_PROPERTIES.rating.VALUE*1;
            return 0;
        },
        labelNew() {
            if (this.item.DISPLAY_PROPERTIES.new)
                return true;
            if (this.item.CURRENT.DISPLAY_PROPERTIES)
                if (this.item.CURRENT.DISPLAY_PROPERTIES.new)
                    return true;
            return false;
        },
        labelSale() {
            var selectedPrice = this.item.CURRENT.ITEM_PRICE_SELECTED;

            if (this.item.CURRENT.ITEM_PRICES[selectedPrice].RATIO_DISCOUNT)
                return true;
            return false;
        },
    },
}
</script>
