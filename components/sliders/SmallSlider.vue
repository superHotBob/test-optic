<template>
<div class="small-slider" v-swiper:mySwiper="swiperOption">
    <div class="swiper-wrapper">
        <nuxt-link 
            class="swiper-slide banner-card" 
            v-for="(item, index) in items" :key="index" 
            :class="{'s-date': date}" 
            :to="{ path: item.properties.link.value }"
        >
            <img class="swiper-lazy" alt="" :data-src="item.src">
            <div class="swiper-lazy-preloader"></div>
            <div class="banner-card__over">
                <p>{{item.name}}</p>
                <span v-if="date">
                    <svg width="13" height="13"><use href="#svg-calendar"/></svg>
                    03/08/2016
                </span>
            </div>
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
                slidesPerView: 3,
                spaceBetween: 30,
                pagination: {
                    el: '.small-slider .s-pagination',
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