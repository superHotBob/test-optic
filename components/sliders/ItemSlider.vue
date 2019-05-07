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
            <nuxt-link class="swiper-slide item-slider__item" to="#0" @click.stop>
                <div class="item-slider__img">
                    <img src="~/assets/images/000-tall.jpg" alt="">
                </div>
                <div class="item-slider__flags">
                    <span class="item-slider__flag left">NEW</span>
                    <span class="item-slider__flag red right">SALE</span>
                </div>
                <ul class="item-slider__offers">
                    <li class="active" @click.prevent>
                        <img src="~/assets/images/catalog/colors/color-grey.jpg" alt="">
                    </li>
                    <li @click.prevent>
                        <img src="~/assets/images/catalog/colors/color-lightblue.jpg" alt="">
                    </li>
                    <li @click.prevent>
                        43
                    </li>
                </ul>
                <div class="item-slider__info">
                    <p class="item-slider__name">Линза Essilor 1,5 Orma Varilux X Crizal Prevencia</p>
                    <p class="item-slider__price">20 523.40 руб.</p>
                    <p class="item-slider__old-price">22 803.78 руб.</p>
                    <p class="item-slider__sale">Еще -10% по акции</p>
                </div>
                <div class="item-slider__buttons">
                    <button class="item-slider__add-to-cart">В корзину</button>
                    <button class="item-slider__favorite">
                        <svg width="17" height="17" fill="#000"><use href="#svg-heart" /></svg>
                        <svg width="16" height="16" fill="#fff"><use href="#svg-heart2" /></svg>
                        В избранное
                    </button>
                    <button class="item-slider__compare">
                        <svg width="18" height="18" fill="#000"><use href="#svg-compare" /></svg>
                        В сравнение
                    </button>
                </div>
            </nuxt-link>
            <nuxt-link class="swiper-slide item-slider__item" to="#0">
                <div class="item-slider__img">
                    <img src="~/assets/images/000-wide.jpg" alt="">
                </div>
                <div class="item-slider__flags">
                    <span class="item-slider__flag left">NEW</span>
                    <span class="item-slider__flag red right">SALE</span>
                </div>
                <ul class="item-slider__offers">
                    <li class="active" @click.prevent>
                        <img src="~/assets/images/catalog/colors/color-grey.jpg" alt="">
                    </li>
                    <li @click.prevent>
                        <img src="~/assets/images/catalog/colors/color-lightblue.jpg" alt="">
                    </li>
                    <li @click.prevent>
                        43
                    </li>
                </ul>
            </nuxt-link>
            <nuxt-link class="swiper-slide item-slider__item" to="#0">
                <div class="item-slider__img">
                    <img src="~/assets/images/placeholders/cards/05.jpg" alt="">
                </div>
                <div class="item-slider__flags">
                    <span class="item-slider__flag left">NEW</span>
                    <span class="item-slider__flag red right">SALE</span>
                </div>
                <ul class="item-slider__offers">
                    <li class="active" @click.prevent>
                        <img src="~/assets/images/catalog/colors/color-grey.jpg" alt="">
                    </li>
                    <li @click.prevent>
                        <img src="~/assets/images/catalog/colors/color-lightblue.jpg" alt="">
                    </li>
                    <li @click.prevent>
                        43
                    </li>
                </ul>
            </nuxt-link>
        </div>
    </div>

</div>
</template>

<script>
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
            }
        }
    },
    
}
</script>
