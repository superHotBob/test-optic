<template>
<div>
    <button class="order__heading mt-0" type="button">1. Товары</button>
    <template v-if="getBasket.GRID">
        <div class="basket-item basket-item--order" v-for="item in getBasket.GRID.ROWS" :key="item.ID" :item="item">
            <div class="basket-item__info">
                <div class="basket-item__img">
                    <img alt="" v-if="item.DETAIL_PICTURE_SRC" v-lazy="'http://14.esobolev.ru/' + item.DETAIL_PICTURE_SRC">
                    <img alt="" v-else v-lazy="'http://14.esobolev.ru/local/components/api/catalog/templates/.default/bitrix/catalog.section/.default/images/no_photo.png'">
                </div>
                <div class="basket-item__offers">
                    <nuxt-link class="basket-item__name" to="#0" :class="{'mt-0': (postponed == true || !item.SKU_BLOCK_LIST)}">{{item.NAME}}</nuxt-link>
                    <div
                        class="item__offers"
                        v-for="prop in item.SKU_BLOCK_LIST"
                        :key="prop.ID"
                        ref="sku_line_block"
                    >
                        <p>{{prop.NAME}}</p>
                        <ul>
                            <template v-for="value in prop.SKU_VALUES_LIST">
                                <li
                                    :data-value="value.ID"
                                    
                                    @click.prevent="changeOffer(item.ID, prop.CODE, value.VALUE_ID)"
                                    v-if="value.SELECTED"
                                    :key="value.ID"
                                    :class="{'img': value.PICT}"
                                >
                                    <img v-if="value.PICT && value.PICT.ID !== 0" :src="'http://14.esobolev.ru/' + value.PICT" alt="" :title="value.NAME">
                                    <span v-if="!value.PICT || value.PICT.ID == 0">{{value.NAME}}</span>
                                </li>
                            </template>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="basket-item__o-quantity">
                {{item.QUANTITY}} шт.
            </div>
            <div class="basket-item__o-price">
                <p>{{item.SUM}}</p>
                <p>{{item.SUM}}</p>
            </div>
        </div>
    </template>
</div>
</template>

<script>
import basket from '~/mixins/basket/basket.js'

export default {
    mixins: [basket],
}
</script>
