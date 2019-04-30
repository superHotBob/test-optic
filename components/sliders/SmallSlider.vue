<template>
<div>
    <div class="small-slider" v-swiper:mySwiper="swiperOption">
        <div class="swiper-wrapper">
            <nuxt-link class="swiper-slide" :class="{'s-date': date}" to="#0">
                <img src="~/assets/images/placeholders/cards/03.jpg" alt="">
                <div class="small-slider__over">
                    <p>
                        Скидки до 20% на элитные оправы Marc O'Polo
                        <span v-if="date">
                            <svg width="13" height="13"><use href="#svg-calendar"/></svg>
                            03/08/2016
                        </span>
                    </p>
                </div>
            </nuxt-link>
            <nuxt-link class="swiper-slide" :class="{'s-date': date}" to="#0">
                <img src="~/assets/images/placeholders/cards/04.jpg" alt="">
                <div class="small-slider__over">
                    <p>
                        Лучшие цены на мировые линзы Essilor
                        <span v-if="date">
                            <svg width="13" height="13"><use href="#svg-calendar"/></svg>
                            03/08/2016
                        </span>
                    </p>
                </div>
            </nuxt-link>
            <nuxt-link class="swiper-slide" :class="{'s-date': date}" to="#0">
                <img src="~/assets/images/placeholders/cards/05.jpg" alt="">
                <div class="small-slider__over">
                    <p>
                        Изысканный дизайн оправ Brendel
                        <span v-if="date">
                            <svg width="13" height="13"><use href="#svg-calendar"/></svg>
                            03/08/2016
                        </span>
                    </p>
                </div>
            </nuxt-link>
        </div>
        <div class="s-pagination main-container"></div>
    </div>
</div>
</template>

<script>

export default {
    props: ['breakpoints', 'date'],
    data () {
        return {
            swiperOption: {
                speed: 500,
                loop: false,
                slidesPerView: 3,
                spaceBetween: 30,
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