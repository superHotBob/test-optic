<template>
<div class="basket-item cart__item">
    <div class="basket-item__info">
        <div class="basket-item__img">
            <img alt="" v-if="item.DETAIL_PICTURE_SRC" v-lazy="'http://14.esobolev.ru/' + item.DETAIL_PICTURE_SRC">
            <img alt="" v-else v-lazy="'http://14.esobolev.ru/local/components/api/catalog/templates/.default/bitrix/catalog.section/.default/images/no_photo.png'">
        </div>
        <div class="basket-item__offers">
            <nuxt-link class="basket-item__name" to="#0" :class="{'mt-0': (!item.SKU_BLOCK_LIST)}">{{item.NAME}}</nuxt-link>
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
    
    <div class="basket-item__price">{{item.PRICE_FORMATED}}</div>
    <div class="basket-item__discount">{{item.DISCOUNT_PRICE_PERCENT_FORMATED}}</div>
    <div class="basket-item__summ">{{item.SUM}}</div>
    <div class="basket-item__actions">
        <div>{{item.QUANTITY}}</div>
    </div>
</div>
</template>

<script>
import basket from '~/mixins/basket/basket.js'

export default {
    props: ['item'],
}
</script>
