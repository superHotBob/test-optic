<template>
    <div>
         <div v-swiper:mySwiper="swiperOption">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item, index) in swiperItems" :key="index">
                    <img :src="item.SRC">
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
          slidesPerView: 'auto',
          centeredSlides: true,
          spaceBetween: 30,
          pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true
          },
        }
      }
    },
    async asyncData({ $axios }) {
        let [swiperData] = await Promise.all([
            $axios.get(`/api/v1/iblock/list/?iblock=2`)
        ])
        return {
            swiperItems: swiperData.data.ITEMS,
        }
    }
}
</script>