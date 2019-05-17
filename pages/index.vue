<template>
<div>
    <big-slider
        :items="swiperItems"
        :breakpoints="bigSliderBps"
    />
    <small-slider
        class="index-features main-container"
        :items="topItems"
        :breakpoints="indexFeaturesBps"
        :date="false"
    />
    <div class="index-grid main-container">
        <div class="index-grid__aside">
            <nuxt-link class="banner-card aside aside-1" to="#0">
                <img src="~/assets/images/placeholders/cards/06.jpg" alt="">
                <div class="banner-card__over">
                    <p>Солнцезащитные очки</p>
                </div>
            </nuxt-link>
            <form class="newsletter aside-2">
                <h2>Рассылка</h2>
                <label class="textfield">
                    <p>Подпишитесь на рассылку</p>
                    <input name="email" type="text" placeholder="yourmail@domain.com">
                </label>
                <button class="button black" @click.prevent>Отправить</button>
            </form>
            <nuxt-link class="banner-card aside aside-3 alt" to="#0">
                <img src="~/assets/images/placeholders/cards/11.jpg" alt="">
                <div class="banner-card__over">
                    <p>Подписывайтесь на наш инстаграм</p>
                </div>
            </nuxt-link>
        </div>
        <div class="index-grid__catalog">
            <item-slider />
        </div>
        <div class="index-grid__blog">
            <h2>Блог</h2>
            <small-slider
                :items="topItems"
                :breakpoints="indexBlogBps"
                :date="true"
            />
            <div class="index-grid__banners">
                <template v-for="(item, index) in bottomItems">
                    <nuxt-link :key="index" class="swiper-slide banner-card" :to="{ path: item.properties.link.value }">
                        <img v-if="item.src" v-lazy="item.src">
                        <div class="banner-card__over">
                            <p>{{item.name}}</p>
                            <b v-if="item.properties.text">{{item.properties.text.value}}</b>
                        </div>
                    </nuxt-link>
                </template>
            </div>
        </div>
    </div>
    <div class="brands main-container">
        <div class="brands__header">
            <h2>Бренды</h2>
            <nuxt-link class="brands__see-all" to="#0">Смотреть все бренды</nuxt-link>
        </div>
        <brands-slider 
            :breakpoints="brandsBps"
        />
    </div>
    <item-preview />
</div>
</template>

<script>

import BigSlider from '~/components/sliders/BigSlider.vue'
import SmallSlider from '~/components/sliders/SmallSlider.vue'
import ItemSlider from '~/components/sliders/ItemSlider.vue'
import ItemPreview from '~/components/catalog/item/ItemPreview.vue'
import BrandsSlider from '~/components/sliders/BrandsSlider.vue'

export default {
    transition: 'fade',
    data () {
        return {
            bigSliderBps: {
                768: {
                    slidesPerView: 1,
                },
            },
            indexFeaturesBps: {
                1000: {
                    slidesPerView: 'auto',
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                },
                650: {
                    slidesPerView: 'auto',
                    spaceBetween: 10,
                },
            },
            indexBlogBps: {
                1200: {
                    slidesPerView: 'auto',
                    spaceBetween: 30,
                },
                1000: {
                    slidesPerView: 'auto',
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                },
                715: {
                    slidesPerView: 'auto',
                    spaceBetween: 10,
                },
            },
            brandsBps: {
                1000: {
                    spaceBetween: 20,
                },
                768: {
                    spaceBetween: 10,
                    slidesPerView: 3,
                    slidesPerColumn: 3,
                },
                500: {
                    spaceBetween: 10,
                    slidesPerView: 2,
                    slidesPerColumn: 3,
                },
            },
        }
    },
    components: {
        BigSlider,
        SmallSlider,
        ItemSlider,
        ItemPreview,
        BrandsSlider,
    },
    asyncData({ store }) {
        return store.dispatch('catalog/CACHE_SERVICE');
    }
}
</script>
