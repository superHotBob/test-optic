<template>
<div class="item-slider">
    <div class="item-slider__categories" v-swiper:mySwiperC="categoriesOption">
        <div class="swiper-wrapper">
            <p
                class="swiper-slide"
                :class="{'active': itemCategory == 'newItems'}"
                @click="itemCategory = 'newItems'"
            >
                Новинки
            </p>
            <p
                class="swiper-slide"
                :class="{'active': itemCategory == 'bestsellers'}"
                @click="itemCategory = 'bestsellers'"
            >
                Бестселлеры
            </p>
            <p
                class="swiper-slide"
                :class="{'active': itemCategory == 'mostWanted'}"
                @click="itemCategory = 'mostWanted'"
            >
                Самое желанное
            </p>
        </div>
        <div class="item-slider__controls">
            <button class="item-slider__prev">Назад</button>
            <button class="item-slider__next">Вперёд</button>
        </div>
    </div>
    <div class="item-slider__items" v-swiper:mySwiper="swiperOption">
        <div class="swiper-wrapper">
            <item
                v-for="(item, index) in items"
                :key="index"
                :item="item"
                :wideView="wideView"
            />
        </div>
    </div>
</div>
</template>

<script>

import Item from '~/components/catalog/item/Item.vue';
import { mapGetters } from 'vuex'

export default {
    props: ['breakpoints', 'date'],
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
                breakpoints: this.$props.breakpoints,
            },
            wideView: false,
            bestsellers: JSON.parse(JSON.stringify(this.$store.state.catalog.bestsellers)),
            newItems: JSON.parse(JSON.stringify(this.$store.state.catalog.newItems)),
        }
    },
    components: {
        Item
    },
    computed: {
        items() {
            if (this.itemCategory == 'bestsellers')
                return this.bestsellers;
            if (this.itemCategory == 'newItems')
                return this.newItems;
            if (this.itemCategory == 'mostWanted')
                return this.mostWanted;
            return this.bestsellers;
        }
    }
}
</script>
