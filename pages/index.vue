<template>
<div class="index-page">
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
                :items="blogItems"
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
            <nuxt-link class="brands__see-all" to="/brands">Смотреть все бренды</nuxt-link>
        </div>
        <brands-slider :breakpoints="brandsBps" :items="brandItems"/>
    </div>
    <div class="features main-container">
        <ul>
            <li>
                <div class="features__icon">
                    <svg id="svg-feature-1" widyh="27" height="27"
                        version="1.1"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve">
                        <path d="M480,143.686H378.752c7.264-4.96,13.504-9.888,17.856-14.304c25.792-25.952,25.792-68.192,0-94.144 c-25.056-25.216-68.768-25.248-93.856,0c-13.856,13.92-50.688,70.592-45.6,108.448h-2.304 c5.056-37.856-31.744-94.528-45.6-108.448c-25.088-25.248-68.8-25.216-93.856,0C89.6,61.19,89.6,103.43,115.36,129.382 c4.384,4.416,10.624,9.344,17.888,14.304H32c-17.632,0-32,14.368-32,32v80c0,8.832,7.168,16,16,16h16v192 c0,17.632,14.368,32,32,32h384c17.632,0,32-14.368,32-32v-192h16c8.832,0,16-7.168,16-16v-80 C512,158.054,497.632,143.686,480,143.686z M138.08,57.798c6.496-6.528,15.104-10.112,24.256-10.112 c9.12,0,17.728,3.584,24.224,10.112c21.568,21.696,43.008,77.12,35.552,84.832c0,0-1.344,1.056-5.92,1.056 c-22.112,0-64.32-22.976-78.112-36.864C124.672,93.318,124.672,71.302,138.08,57.798z M240,463.686H64v-192h176V463.686z M240,239.686H32v-64h184.192H240V239.686z M325.44,57.798c12.992-13.024,35.52-12.992,48.48,0 c13.408,13.504,13.408,35.52,0,49.024c-13.792,13.888-56,36.864-78.112,36.864c-4.576,0-5.92-1.024-5.952-1.056 C282.432,134.918,303.872,79.494,325.44,57.798z M448,463.686H272v-192h176V463.686z M480,239.686H272v-64h23.808H480V239.686z"/>
                    </svg>
                </div>
                <div class="features__text">
                    <p>+15.000 оправ</p>
                    <p>Для женщин, мужчин и детей</p>
                </div>
            </li>
            <li>
                <div class="features__icon">
                    <svg id="svg-feature-2" width="26" height="26"
                        version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 49.94 49.94" xml:space="preserve">
                        <path d="M48.856,22.731c0.983-0.958,1.33-2.364,0.906-3.671c-0.425-1.307-1.532-2.24-2.892-2.438l-12.092-1.757 c-0.515-0.075-0.96-0.398-1.19-0.865L28.182,3.043c-0.607-1.231-1.839-1.996-3.212-1.996c-1.372,0-2.604,0.765-3.211,1.996 L16.352,14c-0.23,0.467-0.676,0.79-1.191,0.865L3.069,16.623C1.71,16.82,0.603,17.753,0.178,19.06 c-0.424,1.307-0.077,2.713,0.906,3.671l8.749,8.528c0.373,0.364,0.544,0.888,0.456,1.4L8.224,44.702 c-0.232,1.353,0.313,2.694,1.424,3.502c1.11,0.809,2.555,0.914,3.772,0.273l10.814-5.686c0.461-0.242,1.011-0.242,1.472,0 l10.815,5.686c0.528,0.278,1.1,0.415,1.669,0.415c0.739,0,1.475-0.231,2.103-0.688c1.111-0.808,1.656-2.149,1.424-3.502 L39.651,32.66c-0.088-0.513,0.083-1.036,0.456-1.4L48.856,22.731z M37.681,32.998l2.065,12.042c0.104,0.606-0.131,1.185-0.629,1.547 c-0.499,0.361-1.12,0.405-1.665,0.121l-10.815-5.687c-0.521-0.273-1.095-0.411-1.667-0.411s-1.145,0.138-1.667,0.412l-10.813,5.686 c-0.547,0.284-1.168,0.24-1.666-0.121c-0.498-0.362-0.732-0.94-0.629-1.547l2.065-12.042c0.199-1.162-0.186-2.348-1.03-3.17 L2.48,21.299c-0.441-0.43-0.591-1.036-0.4-1.621c0.19-0.586,0.667-0.988,1.276-1.077l12.091-1.757 c1.167-0.169,2.176-0.901,2.697-1.959l5.407-10.957c0.272-0.552,0.803-0.881,1.418-0.881c0.616,0,1.146,0.329,1.419,0.881 l5.407,10.957c0.521,1.058,1.529,1.79,2.696,1.959l12.092,1.757c0.609,0.089,1.086,0.491,1.276,1.077 c0.19,0.585,0.041,1.191-0.4,1.621l-8.749,8.528C37.866,30.65,37.481,31.835,37.681,32.998z"/>
                    </svg>
                </div>
                <div class="features__text">
                    <p>Более 15 брендов</p>
                    <p>Marc O'Polo, Seiko и др.</p>
                </div>
            </li>
            <li>
                <div class="features__icon">
                    <svg id="svg-feature-3" width="25" height="25"
                        version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 410.344 410.344"  xml:space="preserve">
                        <path d="M205.212,0C119.37,0.088,49.816,69.678,49.772,155.52c0,83.52,143.36,245.36,149.44,252.16 c2.947,3.292,8.005,3.571,11.297,0.624c0.219-0.196,0.427-0.404,0.624-0.624c6.08-6.88,149.44-168.64,149.44-252.16 C360.528,69.709,291.022,0.132,205.212,0z M205.212,390.16c-27.36-32-139.44-166.32-139.44-234.72 C65.772,78.429,128.201,16,205.212,16s139.44,62.429,139.44,139.44C344.652,223.84,232.572,358.32,205.212,390.16z"/>
                        <path d="M208.012,78c-46.524,0.044-84.204,37.796-84.16,84.32c0.044,46.524,37.796,84.204,84.32,84.16 c46.493-0.044,84.16-37.747,84.16-84.24C292.244,115.721,254.531,78.044,208.012,78z M208.012,230.56 c-37.688,0-68.24-30.552-68.24-68.24s30.552-68.24,68.24-68.24s68.24,30.552,68.24,68.24 C276.208,199.99,245.681,230.516,208.012,230.56z"/>
                    </svg>
                </div>
                <div class="features__text">
                    <p>Быстрая доставка</p>
                    <p>Доставляем по всему миру</p>
                </div>
            </li>
            <li>
                <div class="features__icon">
                    <svg id="svg-feature-4" width="26" height="26"
                        version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                        <path d="M437.02,74.98C388.668,26.628,324.38,0,256,0S123.332,26.628,74.98,74.98C26.629,123.332,0,187.62,0,256 s26.629,132.668,74.98,181.02C123.332,485.372,187.62,512,256,512s132.668-26.628,181.02-74.98 C485.371,388.668,512,324.38,512,256S485.371,123.332,437.02,74.98z M256,482C131.383,482,30,380.617,30,256S131.383,30,256,30 s226,101.383,226,226S380.617,482,256,482z"/>
                        <path d="M272.067,241h-32.134c-18.307,0-33.2-14.893-33.2-33.199c0-18.307,14.894-33.2,33.2-33.2H304.2c8.284,0,15-6.716,15-15 s-6.716-15-15-15H271v-33.2c0-8.284-6.716-15-15-15s-15,6.716-15,15v33.2h-1.066c-34.849,0-63.2,28.352-63.2,63.2 c0,34.848,28.352,63.199,63.2,63.199h32.134c18.306,0,33.199,14.894,33.199,33.2c0,18.306-14.893,33.2-33.199,33.2h-64.267 c-8.284,0-15,6.716-15,15s6.716,15,15,15H241v33.201c0,8.284,6.716,15,15,15s15-6.716,15-15V367.4h1.067 c34.848,0,63.199-28.352,63.199-63.2S306.915,241,272.067,241z"/>
                    </svg>
                </div>
                <div class="features__text">
                    <p>Возврат за 7 дней</p>
                    <p>Гарантия 100%</p>
                </div>
            </li>
        </ul>
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

<style lang="scss">
.index-page {
    .brands {
        margin-top: 110px;
        &__header {
            border-top: 1px solid #e6e6e6;
        }
    }
    .features {
        margin-top: 80px;
        ul {
            border-top: 1px solid #e6e6e6;
        }
    }
}
@media (max-width: 768px) {
    .index-page {
        .brands {
            margin-top: 50px;
            padding: 0 32px;
        }
        .features {
            margin-top: 40px;
        }
    }
}
@media (max-width: 500px) {
    .index-page {
        .features {
            padding-left: 32px;
        }
    }
}

</style>
