<template>
    <div>
         <div v-swiper:mySwiper="swiperOption">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item, index) in swiperItems" :key="index">
                    <img :src="item.src">
                </div>
            </div>
            <div class="swiper-pagination swiper-pagination-bullets"></div>
        </div>
    </div>
</template>

<script>

export default {
    components: {
        
    },
    data () {
      return {
        swiperOption: {
            loop: true,
            slidesPerView: 2,
            spaceBetween: 0,
            pagination: {
                el: '.swiper-pagination',
                dynamicBullets: true
            },
        }
      }
    },
    async asyncData({ $axios }) {
        let [swiperData, stockData, banerData] = await Promise.all([
            $axios.get(`/api/v1/iblock/list/?iblock=2&properties[0]=name`, { cache: true }),
            $axios.get(`/api/v1/iblock/list/?iblock=5&count=3&properties[0]=link`, { cache: true }),
            $axios.get(`/api/v1/iblock/list/?iblock=4&count=1&properties[0]=link`, { cache: true })
        ])
        return {
            swiperItems: swiperData.data.items,
            stockItems: stockData.data.items,
            banerData: stockData.data.items
        }
    }
}
</script>