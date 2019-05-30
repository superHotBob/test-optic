<template>
<div class="cart-item">
    <div class="cart-item__info">
        <div class="cart-item__img">
            <img alt="" v-if="item.DETAIL_PICTURE_SRC" v-lazy="'http://14.esobolev.ru/' + item.DETAIL_PICTURE_SRC">
            <img alt="" v-else v-lazy="'http://14.esobolev.ru/local/components/api/catalog/templates/.default/bitrix/catalog.section/.default/images/no_photo.png'">
        </div>
        <div class="cart-item__offers" >
            <nuxt-link class="cart-item__name" to="#0" :class="{'mt-0': postponed == true}">{{item.NAME}}</nuxt-link>
            <template v-if="postponed == false">
                <div class="item__offers">
                    <p>Цвет</p>
                    <ul>
                        <li data-value="1" class="selected">
                            <span>Белый</span>
                        </li>
                        <li data-value="3" class="img">
                            <img src="http://14.esobolev.ru/upload/uf/16b/16b3d0feb9273f4f6bff8a161655f2c5.jpg" alt="" title="Красный">
                        </li>
                        <li data-value="2" class="">
                            <span>Черный</span>
                        </li>
                    </ul>
                </div>
                <div class="item__offers">
                    <p>Размер</p>
                    <ul>
                        <li data-value="5" class="">
                            <span>51/35/17/135</span>
                        </li>
                        <li data-value="4" class="selected">
                            <span>52/36/16/135</span>
                        </li>
                    </ul>
                </div>
            </template>
        </div>
    </div>
    <div class="cart-item__price">{{item.PRICE_FORMATED}}</div>
    <div class="cart-item__discount" v-if="postponed">{{item.DISCOUNT_PRICE_PERCENT_FORMATED}}</div>
    <div class="cart-item__summ">{{item.SUM}}</div>
    <div class="cart-item__actions">
        <div v-if="postponed">{{item.QUANTITY}}</div>
        <div v-else ><quantity v-bind:id="item.ID"/></div>
        <div class="cart-item__buttons">
            <div><button>Удалить</button></div>
            <div><button>Отложить</button></div>
        </div>
    </div>
</div>
</template>

<script>
import basket from '~/mixins/basket/basket.js'
import Quantity from '~/components/header/basket.small/Quantity.vue'

export default {
    props: {
        item: Object,
        postponed: {
            type: Boolean,
            default: false,
        }
    },
    mixins: [basket],
    components: {
        Quantity
    },
}
</script>
