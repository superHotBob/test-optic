<template>
<div>
    <div class="big-slider" v-swiper:mySwiper="swiperOption">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item, index) in items" :key="index">
                <img :src="item.src" alt="">
                <div class="big-slider__over">
                    <p v-if="item.description">{{ item.description }}</p>
                    <nuxt-link
                        class="button black"
                        :to="{ path: item.properties.link.value }"
                        v-if="item.properties.link.value"
                    >
                        {{ item.properties.name.value ? item.properties.name.value : 'Подробнее' }}
                    </nuxt-link>
                </div>
            </div>
        </div>
        <div class="s-pagination main-container"></div>
    </div>
</div>
</template>

<script>

export default {
    props: ['items', 'breakpoints'],
    data () {
        return {
            swiperOption: {
                speed: 500,
                loop: true,
                slidesPerView: 2,
                spaceBetween: 0,
                autoplay: {
                    delay: 5000,
                },
                pagination: {
                    el: '.s-pagination',
                    bulletClass: 's-pagination__bullet',
                    bulletActiveClass: 's-pagination__bullet--active',
                    clickableClass: 's-pagination--clickable',
                    clickable: true,
                },
                breakpoints: this.$props.breakpoints,
            }
        }
    },
}
</script>