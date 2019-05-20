<template>
<div class="basket__item">
    <div class="basket__img">
        <img alt="" v-if="arItem.DETAIL_PICTURE_SRC" v-lazy="'http://14.esobolev.ru/' + arItem.DETAIL_PICTURE_SRC">
        <img alt="" v-else v-lazy="'http://14.esobolev.ru/local/components/api/catalog/templates/.default/bitrix/catalog.section/.default/images/no_photo.png'">
        
        <!-- Нет свойств в корзине -->
        <div class="basket__flags">
            <span class="basket__flag left">NEW</span>
            <span class="basket__flag right red">SALE</span>
        </div>
    </div>
    <div class="basket__props">
        <b class="basket__name">{{arItem.NAME}}</b>
        <p class="basket__prop" v-for="(prop, index) in arItem.PROPS" :key="index">
            {{prop.NAME}}
            <span class="basket__square">{{prop.VALUE}}</span>
        </p>
        <!-- Трудно достаётся ссылка на изображение цвета у предмета корзины. Сейчас в массиве SKU_BLOCK_LIST, в котором еще массив из всех возможных SKU_VALUES_LIST. Будет ли ссылка прямо в PROPS?-->
        <!-- <p class="basket__prop">
            Цвет
            <span class="basket__square"><img src="#" alt=""></span>
        </p> -->
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
    }
}
</script>
