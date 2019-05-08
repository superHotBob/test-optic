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
                v-bind:item="item"
            />
            <nuxt-link class="swiper-slide item" to="#0">
                <div class="item__img">
                    <img src="~/assets/images/000-tall.jpg" alt="">
                </div>
                <div class="item__flags">
                    <span class="item__flag left">NEW</span>
                    <span class="item__flag red right">SALE</span>
                </div>
                <ul class="item__offers">
                    <li class="active" @click.prevent>
                        <img src="~/assets/images/catalog/colors/color-grey.jpg" alt="">
                    </li>
                    <li @click.prevent>
                        <img src="~/assets/images/catalog/colors/color-lightblue.jpg" alt="">
                    </li>
                    <li @click.prevent>
                        60/43/18/145
                    </li>
                </ul>
                <div class="item__info">
                    <p class="item__name">Линза Essilor 1,5 Orma Varilux X Crizal Prevencia</p>
                    <p class="item__price">20 523.40 руб.</p>
                    <p class="item__old-price">22 803.78 руб.</p>
                    <p class="item__sale">Еще -10% по акции</p>
                </div>
                <div class="item__buttons">
                    <button class="item__add-to-cart" @click.prevent>В корзину</button>
                    <button class="item__favorite" @click.prevent>
                        <svg width="17" height="17" fill="#000"><use href="#svg-heart" /></svg>
                        <svg width="16" height="16" fill="#fff"><use href="#svg-heart2" /></svg>
                        В избранное
                    </button>
                    <button class="item__compare" @click.prevent>
                        <svg width="18" height="18" fill="#000"><use href="#svg-compare" /></svg>
                        В сравнение
                    </button>
                </div>
            </nuxt-link>
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
            condition: true,
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
