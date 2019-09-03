<template>
<div class="item-slider" v-if="returnItems">
    <div class="item-slider__categories" v-swiper:mySwiperC="categoriesOption">
        <div v-if="items == 'recommended'">
            <p class="simple active"><slot>Рекоммендуем вам</slot></p>
        </div>
        <div class="swiper-wrapper" v-else>
            <p  v-if="itemCategory === 'newItems' && returnItems"
                class="swiper-slide"
                :class="{'active': itemCategory == 'newItems'}"
                @click="itemCategory = 'newItems'"
            >Новинки</p>
            <p  v-if="itemCategory === 'bestsellers' && returnItems"
                class="swiper-slide"
                :class="{'active': itemCategory == 'bestsellers'}"
                @click="itemCategory = 'bestsellers'"
            >Бестселлеры</p>
            <p  v-if="itemCategory === 'mostWanted' && returnItems"
                class="swiper-slide"
                :class="{'active': itemCategory == 'mostWanted'}"
                @click="itemCategory = 'mostWanted'"
            >Самое желанное</p>
        </div>
        <div class="item-slider__controls">
            <button class="item-slider__prev">Назад</button>
            <button class="item-slider__next">Вперёд</button>
        </div>
    </div>
    <div class="item-slider__items" v-swiper:mySwiper="swiperOption">
        <div class="swiper-wrapper">
            <item
                v-for="(item, index) in returnItems"
                :key="index"
                :item="item"
            />
        </div>
    </div>
</div>
</template>

<script>

import Item from '~/components/catalog/item/Item.vue';
import { mapGetters } from 'vuex'

export default {
    props: {
        breakpoints: {},
        items: '',
        elements: {}
    },
    data () {
        return {
            itemCategory: 'bestsellers',
            swiperOption: {
                roundLengths: true,
                speed: 500,
                loop: false,
                slidesPerView: 'auto',
                spaceBetween: 0,
                pagination: {
                    el: '.item-slider .s-pagination',
                    bulletClass: 's-pagination__bullet',
                    bulletActiveClass: 's-pagination__bullet--active',
                    clickableClass: 's-pagination--clickable',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.item-slider__next',
                    prevEl: '.item-slider__prev',
                    disabledClass: 'disabled',
                },
                breakpoints: this.$props.breakpoints,
            },
            categoriesOption: {
                roundLengths: true,
                speed: 500,
                loop: false,
                slidesPerView: 'auto',
                spaceBetween: 0,
                freeMode: true,
            },
            bestsellers: JSON.parse(JSON.stringify(this.$store.state.catalog.bestsellers)),
            newItems: JSON.parse(JSON.stringify(this.$store.state.catalog.newItems)),
        }
    },
    components: {
        Item
    },
    computed: {
        returnItems() {

            if (this.elements)
                return this.elements;

            if (this.items == 'recommended')
                return this.bestsellers; // нужно подставить правильный геттер

            if (this.itemCategory == 'bestsellers')
                return this.bestsellers;
            if (this.itemCategory == 'newItems')
                return this.newItems;
            if (this.itemCategory == 'mostWanted')
                return this.bestsellers;
            
            return this.bestsellers;
        }
    }
}
</script>
