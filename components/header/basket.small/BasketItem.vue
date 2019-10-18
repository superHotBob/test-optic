<template>
<div class="basket__item">
    <div class="basket__img">
        <img alt="" v-if="arItem.PREVIEW_PICTURE_SRC_ORIGINAL" v-lazy="arItem.PREVIEW_PICTURE_SRC_ORIGINAL">
        <img alt="" v-else v-lazy="'/bitrix/components/bitrxi/catalog/templates/.default/bitrix/catalog.section/.default/images/no_photo.png'">
        <div class="basket__flags">
            <span class="basket__flag left" v-for="(label, index) in arItem.LABEL_VALUES" :key="index">{{label.NAME}}</span>
            <span class="basket__flag right red" v-if="arItem.DISCOUNT_PRICE">SALE</span>
        </div>
    </div>
    <div class="basket__props">
        <b class="basket__name">{{arItem.NAME}}</b>
        <p class="basket__prop" v-for="(prop, index) in arItem.SKU_BLOCK_LIST" :key="index">
            {{prop.NAME}}
            <template v-for="(value, propIndex) in prop.SKU_VALUES_LIST">
                <span class="basket__square img" v-if="value.SELECTED && value.PROP_CODE == 'color'" :key="propIndex">
                    <img :title="value.NAME" alt="" v-if="value.PICT" v-lazy="value.PICT">
                    <span class="basket__square" v-else :key="propIndex">{{value.NAME}}</span>
                </span>
                <span class="basket__square" v-if="value.SELECTED && value.PROP_CODE !== 'color'" :key="propIndex">{{value.NAME}}</span>
            </template>
        </p>
    </div>
    <div class="basket__price-col">
        <button v-on:click="deleteItem(arItem.ID)" type="button" class="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        <b class="basket__price">{{arItem.PRICE_FORMATED}}</b>
        <quantity v-bind:id="arItem.ID"/>
    </div>
</div>
</template>

<script>
import basket from '~/mixins/basket/basket.js'
import Quantity from '~/components/header/basket.small/Quantity.vue'

export default {
    props: ['arItem'],
    mixins: [basket],
    components: {
        Quantity
    },
}
</script>
