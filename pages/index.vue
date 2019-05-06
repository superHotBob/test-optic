<template>
<div>
    <big-slider
        :items="swiperItems"
        :breakpoints="bigSliderBps"
    />
    <small-slider
        class="index-features main-container"
        :breakpoints="indexFeaturesBps"
        :date="true"
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
            <h2>Grid 3</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores, doloribus.</p>
        </div>
    </div>
</div>
</template>

<script>

import BigSlider from '~/components/sliders/BigSlider.vue'
import SmallSlider from '~/components/sliders/SmallSlider.vue'
import ItemSlider from '~/components/sliders/ItemSlider.vue'

export default {
    data () {
        return {
            bigSliderBps: {
                768: {
                    slidesPerView: 1,
                }
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
                }
            }
        }
    },
    components: {
        BigSlider,
        SmallSlider,
        ItemSlider,
    },
    async asyncData({ $axios }) {
        let [swiperData, stockData, banerData] = await Promise.all([
            $axios.get(`/api/v1/iblock/list/?iblock=2&properties[0]=name`),
            $axios.get(`/api/v1/iblock/list/?iblock=5&count=3&properties[0]=link`),
            $axios.get(`/api/v1/iblock/list/?iblock=4&count=1&properties[0]=link`)
        ])
        return {
            swiperItems: swiperData.data.items,
            stockItems: stockData.data.items,
            banerData: stockData.data.items
        }
    }
}
</script>

<style lang="scss">
.index-grid {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-column-gap: 30px;
    grid-column-gap: 2.5%;
    grid-template-areas: 
        "aside catalog"
        "aside blog";
    margin-top: 30px;
    &__aside {
        grid-area: aside;
        width: 270px;
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
        border: 1px solid red;
        .item-slider {
            width: 100%;
        }
    }

}
@media (max-width: 768px) {
    .index-grid {
        &__aside {
            width: 310px;
        }
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
    }
}
</style>
