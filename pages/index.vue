<template>
<div>
    <big-slider
        :items="swiperItems"
        :breakpoints="bigSliderBps" />
    <small-slider
        class="index-features main-container"
        :breakpoints="indexFeaturesBps"
        :date="false" />

</div>
</template>

<script>

import BigSlider from '~/components/sliders/BigSlider.vue'
import SmallSlider from '~/components/sliders/SmallSlider.vue'

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
@media (max-width: 1000px) and (min-width: 769px) {
    .index-features {
        padding-right: 0;
    }
}
@media (max-width: 650px) {
    .index-features {
        padding-right: 0;
    }
}
</style>
