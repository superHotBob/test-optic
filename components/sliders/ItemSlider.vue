<template>
<div class="item-slider">
    <div class="item-slider__categories" v-swiper:mySwiperC="categoriesOption">
        <div class="swiper-wrapper">
            <p class="swiper-slide active">Название категории</p>
            <p class="swiper-slide" @click="condition = !condition">Очень длинное название категории</p>
            <p class="swiper-slide" :class="{'active': condition}">Еще какая-то категория</p>
        </div>
        <div class="item-slider__controls">
            <button class="item-slider__prev">Назад</button>
            <button class="item-slider__next">Вперёд</button>
        </div>
    </div>
    <div class="item-slider__items" v-swiper:mySwiper="swiperOption">
        <div class="swiper-wrapper">
            <item
                v-for="(item, index) in bestsellers"
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
            swiperOption: {
                roundLengths: true,
                speed: 500,
                loop: false,
                slidesPerView: 'auto',
                spaceBetween: 0,
                pagination: {
                    el: '.s-pagination',
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
            condition: true,
            wideView: false
        }
    },
    components: {
        Item
    },
    computed: {
        ...mapGetters({
            bestsellers: 'catalog/getBestsellers',
        })
    },
    
}
</script>
