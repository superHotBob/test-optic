<template>
<div class="basket-item">
    <div class="basket-item__info">
        <div class="basket-item__img">
            <img alt="" v-if="item.PREVIEW_PICTURE_SRC_ORIGINAL" v-lazy="item.PREVIEW_PICTURE_SRC_ORIGINAL">
            <img alt="" v-else v-lazy="'/bitrix/components/bitrix/catalog/templates/.default/bitrix/catalog.section/.default/images/no_photo.png'">
        </div>
        <div class="basket-item__offers">
            <nuxt-link class="basket-item__name" :to="item.DETAIL_PAGE_URL" :class="{'mt-0': (postponed == true || !item.SKU_BLOCK_LIST)}">{{item.NAME}}</nuxt-link>
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
                            <img v-if="value.PICT && value.PICT.ID !== 0" :src="value.PICT" alt="" :title="value.NAME">
                            <span v-if="!value.PICT || value.PICT.ID == 0">{{value.NAME}}</span>
                        </li>
                    </ul>
                </div>
            </template>
            <template  v-for="prop in sortProps">
                <div
                    class="item__offers"
                    style="width: 100%;"
                    :key="prop.CODE"
                    v-if="prop.CODE == 'left' || prop.CODE == 'right'"
                >
                    <p>{{prop.NAME}}</p>
                    <ul>
                        <li v-if="getPropValue(prop['~VALUE']).sph" class="selected">
                            <span>sph: {{getPropValue(prop['~VALUE']).sph}}</span>
                        </li>
                        <li v-if="getPropValue(prop['~VALUE']).cyl" class="selected">
                            <span>cyl: {{getPropValue(prop['~VALUE']).cyl}}</span>
                        </li>
                        <li v-if="getPropValue(prop['~VALUE']).ax" class="selected">
                            <span>ax: {{getPropValue(prop['~VALUE']).ax}}</span>
                        </li>
                        <li v-if="getPropValue(prop['~VALUE']).add" class="selected">
                            <span>add: {{getPropValue(prop['~VALUE']).add}}</span>
                        </li>
                        <li v-if="getPropValue(prop['~VALUE']).deg" class="selected">
                            <span>deg: {{getPropValue(prop['~VALUE']).deg}}</span>
                        </li>
                    </ul>
                </div>
            </template>
            <div style="display: flex; flex-wrap: wrap; width: 100%;">
                <template  v-for="(prop, distanceIndex) in item.PROPS">
                    <div
                        class="item__offers"
                        :key="distanceIndex"
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
            </div>
            <template  v-for="(prop, serviceIndex) in item.PROPS">
                <div
                    class="item__offers"
                    :key="serviceIndex"
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
    computed: {
        sortProps() {

            var props = JSON.parse(JSON.stringify(this.item.PROPS))
            
            props = props.sort( (a, b) => {
                if ( a.NAME > b.NAME) return -1
                if ( a.NAME == b.NAME) return 0
                if ( a.NAME < b.NAME) return 1
            })

            return props
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
