<template>
<div class="brands-slider" v-swiper:mySwiper="swiperOption">
    <div class="swiper-wrapper">
        <nuxt-link class="swiper-slide" :to="'/brands/'+item.code" v-for="(item, index) in items" :key="index">
            <img class="swiper-lazy" :src="item.src" alt="">
            <div class="swiper-lazy-preloader"></div>
        </nuxt-link>
    </div>
    <div class="s-pagination main-container"></div>
</div>
</template>

<script>

export default {
    props: ['breakpoints', 'items'],
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