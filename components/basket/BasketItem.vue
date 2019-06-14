<template>
<div class="basket-item">
    <div class="basket-item__info">
        <div class="basket-item__img">
            <img alt="" v-if="item.DETAIL_PICTURE_SRC" v-lazy="'http://14.esobolev.ru/' + item.DETAIL_PICTURE_SRC">
            <img alt="" v-else v-lazy="'http://14.esobolev.ru/local/components/api/catalog/templates/.default/bitrix/catalog.section/.default/images/no_photo.png'">
        </div>
        <div class="basket-item__offers">
            <nuxt-link class="basket-item__name" to="#0" :class="{'mt-0': (postponed == true || !item.SKU_BLOCK_LIST)}">{{item.NAME}}</nuxt-link>
            <template v-if="postponed == false">
                <div
                    class="item__offers"
                    v-for="prop in item.SKU_BLOCK_LIST"
                    :key="prop.ID"
                    ref="sku_line_block"
                >
                    <p>{{prop.NAME}}</p>
                    <ul>
                        <li
                            :data-value="value.ID"
                            
                            @click.prevent="changeOffer(item.ID, prop.CODE, value.VALUE_ID)"
                            v-for="value in prop.SKU_VALUES_LIST"
                            :key="value.ID"
                            :class="{'img': value.PICT, 'selected': value.SELECTED, 'not-available':value.NOT_AVAILABLE_OFFER}"
                        >
                            <img v-if="value.PICT && value.PICT.ID !== 0" :src="'http://14.esobolev.ru/' + value.PICT" alt="" :title="value.NAME">
                            <span v-if="!value.PICT || value.PICT.ID == 0">{{value.NAME}}</span>
                        </li>
                    </ul>
                </div>
            </template>
            <template  v-for="(prop, index) in item.PROPS">
                <div
                    class="item__offers"
                    :key="index"
                    v-if="prop.CODE == 'left' || prop.CODE == 'right'"
                >
                    <p>{{prop.NAME}}</p>
                    <ul>
                        <li class="selected">
                            <span>sph: {{getPropValue(prop['~VALUE']).sph}}</span>
                        </li>
                        <li class="selected">
                            <span>cyl: {{getPropValue(prop['~VALUE']).cyl}}</span>
                        </li>
                        <li class="selected">
                            <span>ax: {{getPropValue(prop['~VALUE']).ax}}</span>
                        </li>
                        <li class="selected">
                            <span>add: {{getPropValue(prop['~VALUE']).add}}</span>
                        </li>
                    </ul>
                </div>
            </template>
            <template  v-for="(prop, index) in item.PROPS">
                <div
                    class="item__offers"
                    :key="index"
                    v-if="prop.CODE == 'center_distance_left' || prop.CODE == 'center_distance_right'"
                >
                    <p>{{prop.NAME}}</p>
                    <ul>
                        <li class="selected">
                            <span>{{prop['~VALUE']}}</span>
                        </li>
                    </ul>
                </div>
            </template>
            <template  v-for="(prop, index) in item.PROPS">
                <div
                    class="item__offers"
                    :key="index"
                    v-if="prop.CODE == 'service'"
                >
                    <p>{{prop.NAME}}</p>
                    <ul>
                        <li class="selected">
                            <span>{{prop['~VALUE']}}</span>
                        </li>
                    </ul>
                </div>
            </template>
        </div>
    </div>
    
    <div class="basket-item__price">{{item.PRICE_FORMATED}}</div>
    <div class="basket-item__discount" v-if="postponed">{{item.DISCOUNT_PRICE_PERCENT_FORMATED}}</div>
    <div class="basket-item__summ">{{item.SUM}}</div>
    <div class="basket-item__actions">
        <div v-if="postponed">{{item.QUANTITY}}</div>
        <div v-else ><quantity v-bind:id="item.ID"/></div>
        <div class="basket-item__buttons">
            <div><button type="button" @click="deleteItem(item.ID)">Удалить</button></div>
            <div><button type="button">Отложить</button></div>
        </div>
    </div>
</div>
</template>

<script>
import basket from '~/mixins/basket/basket.js'
import Quantity from '~/components/header/basket.small/Quantity.vue'

export default {
    mixins: [basket],
    props: {
        item: Object,
        postponed: {
            type: Boolean,
            default: false,
        }
    },
    methods: {
        getPropValue(value) {
            return JSON.parse(value);
        }
    },
    components: {
        Quantity
    },
}
</script>
