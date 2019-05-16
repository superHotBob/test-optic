<template>
<div>
    <big-slider
        :items="swiperItems"
        :breakpoints="bigSliderBps"
    />
    <small-slider
        class="index-features main-container"
        :items="stockItems"
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
                class="index-features"
                :items="stockItems"
                :breakpoints="indexBlogBps"
                :date="true"
            />
            <div class="index-grid__banners">
                <nuxt-link class="swiper-slide banner-card" to="#0">
                    <img src="~/assets/images/placeholders/cards/10.jpg" alt="">
                    <div class="banner-card__over">
                        <p>Профессиональое изготовление очков</p>
                        <b>Подробнее</b>
                    </div>
                </nuxt-link>
                <nuxt-link class="swiper-slide banner-card" to="#0">
                    <img src="~/assets/images/placeholders/cards/04.jpg" alt="">
                    <div class="banner-card__over">
                        <p>Скидка 20% на прогрессивные линзы SEIKO</p>
                        <b>Купить</b>
                    </div>
                </nuxt-link>
                <nuxt-link class="swiper-slide banner-card" to="#0">
                    <img src="~/assets/images/placeholders/cards/10.jpg" alt="">
                    <div class="banner-card__over">
                        <p>Профессиональое изготовление очков</p>
                        <b>Подробнее</b>
                    </div>
                </nuxt-link>
                <nuxt-link class="swiper-slide banner-card" to="#0">
                    <img src="~/assets/images/placeholders/cards/04.jpg" alt="">
                    <div class="banner-card__over">
                        <p>Скидка 20% на прогрессивные линзы SEIKO</p>
                        <b>Купить</b>
                    </div>
                </nuxt-link>
            </div>
        </div>
    </div>
    <item-preview />
</div>
</template>

<script>

import BigSlider from '~/components/sliders/BigSlider.vue'
import SmallSlider from '~/components/sliders/SmallSlider.vue'
import ItemSlider from '~/components/sliders/ItemSlider.vue'
import ItemPreview from '~/components/catalog/item/ItemPreview.vue'

export default {
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
                    slidesPerView: 'auto',
                    spaceBetween: 10,
                },
            },
        }
    },
    components: {
        BigSlider,
        SmallSlider,
        ItemSlider,
        ItemPreview,
    },
    asyncData({ store }) {     
        return store.dispatch('catalog/CACHE_SERVICE');
    }
}
</script>

<style lang="scss">
.index-grid {
    display: grid;
    grid-template-columns: 270px minmax(100px, 3fr);
    grid-column-gap: 30px;
    grid-template-areas: 
        "aside catalog"
        "aside blog";
    margin-top: 30px;
    &__aside {
        grid-area: aside;
        .banner-card {
            max-width: 100%;
        }
    }
    .aside-1 {
        height: 460px;
        margin-bottom: 30px;
    }
    .aside-2 {
        margin: auto;
    }
    .aside-3 {
        margin: 0 auto;
        margin-top: 30px;
        height: 322px;
    }
    &__catalog {
        grid-area: catalog;
        margin-bottom: auto;
        border: 1px solid red;
    }
    &__blog {
        margin-top: auto;
    }
    &__banners {
        display: flex;
        flex-wrap: wrap;
        .banner-card {
            flex-shrink: 0;
            flex-grow: 1;
            width: calc(57% - 30px);
            margin-top: 30px;
            b {
                display: block;
                margin-top: 15px;
                font-size: 13px;
                font-weight: 600;
                text-transform: uppercase
            }
            p {
                font-size: 20px;
                line-height: 28px;
            }
            &__over {
                right: unset;
                bottom: 10px;
                left: 10px;
                width: 66%;
            }
            &:nth-of-type(2n) {
                width: 43%;
                margin-left: 30px;
                .banner-card {
                    &__over {
                        width: 63%;
                        top: 10px;
                        bottom: unset;
                    }
                }
            }
        }
    }
}
@media (max-width: 1100px) {
    .index-grid {
        &__banners {
            .banner-card {
                p {
                    font-size: 16px;
                    line-height: 22px;
                }
            }
        }
    }
}
@media (max-width: 1000px) {
    .index-grid {
        &__banners {
            .banner-card {
                &:nth-of-type(n) {
                    width: 100%;
                    margin-left: 0;
                    .banner-card {
                        &__over {
                            top: unset;
                            bottom: 10px;
                        }
                    }
                }
            }
        }
    }
}
@media (max-width: 768px) {
    .index-grid {
        grid-template-columns: minmax(100px, 768px);
        grid-template-areas: 
            "catalog catalog"
            "aside aside"
            "blog blog";
        grid-template-areas: 
            "catalog"
            "aside"
            "blog";
        .aside-1 {
            height: 150px;
            img {
                transition: 0ms;
                transform: scale(1.8) translateY(30px) translateX(-45px);
            }
            .banner-card__over {
                width: 65%;
            }
        }
        .aside-2 {
            width: 256px;
        }
        .aside-3 {
            width: 256px;
            height: 255px;
            .banner-card__over {
                width: 85%;
            }
        }
        &__banners {
            margin-top: 30px;
            .banner-card {
                margin-top: 10px;
            }
        }
    }
}
</style>
