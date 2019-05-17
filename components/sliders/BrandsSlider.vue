<template>
<div class="brands-slider" v-swiper:mySwiper="swiperOption">
    <div class="swiper-wrapper">
        <nuxt-link class="swiper-slide" to="#0">
            <img class="swiper-lazy" alt="" src="~/assets/images/brands/brendel.jpg">
            <div class="swiper-lazy-preloader"></div>
        </nuxt-link>
        <nuxt-link class="swiper-slide" to="#0">
            <img class="swiper-lazy" alt="" src="~/assets/images/brands/essilor.jpg">
            <div class="swiper-lazy-preloader"></div>
        </nuxt-link>
        <nuxt-link class="swiper-slide" to="#0">
            <img class="swiper-lazy" alt="" src="~/assets/images/brands/fineline.jpg">
            <div class="swiper-lazy-preloader"></div>
        </nuxt-link>
        <nuxt-link class="swiper-slide" to="#0">
            <img class="swiper-lazy" alt="" src="~/assets/images/brands/freigeist.jpg">
            <div class="swiper-lazy-preloader"></div>
        </nuxt-link>
        <nuxt-link class="swiper-slide" to="#0">
            <img class="swiper-lazy" alt="" src="~/assets/images/brands/humphreys.jpg">
            <div class="swiper-lazy-preloader"></div>
        </nuxt-link>
        <nuxt-link class="swiper-slide" to="#0">
            <img class="swiper-lazy" alt="" src="~/assets/images/brands/jos.jpg">
            <div class="swiper-lazy-preloader"></div>
        </nuxt-link>
        <nuxt-link class="swiper-slide" to="#0">
            <img class="swiper-lazy" alt="" src="~/assets/images/brands/marcopolo.jpg">
            <div class="swiper-lazy-preloader"></div>
        </nuxt-link>
        <nuxt-link class="swiper-slide" to="#0">
            <img class="swiper-lazy" alt="" src="~/assets/images/brands/mekk.jpg">
            <div class="swiper-lazy-preloader"></div>
        </nuxt-link>
    </div>
    <div class="s-pagination main-container"></div>
</div>
</template>

<script>

export default {
    props: ['items', 'breakpoints', 'date'],
    data () {
        return {
            swiperOption: {
                roundLengths: true,
                speed: 500,
                loop: false,
                slidesPerView: 'auto',
                spaceBetween: 30,
                pagination: {
                    el: '.brands-slider .s-pagination',
                    bulletClass: 's-pagination__bullet',
                    bulletActiveClass: 's-pagination__bullet--active',
                    clickableClass: 's-pagination--clickable',
                    clickable: true,
                },
                lazy: {
                    loadPrevNext: true,
                    loadPrevNextAmount: 100,
                },
                breakpoints: this.$props.breakpoints,
            }
        }
    },
}
</script>