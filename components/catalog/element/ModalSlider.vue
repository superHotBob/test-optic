<template>
 <b-modal id="modal-center" size='lg' centered >
    <b-carousel
        id="carousel-8"           
        :interval="40000"
        controls
        indicators
        background="#fff"          
    >
        <b-carousel-slide  :key="index" v-for="(img, index) in item.CURRENT.MORE_PHOTO" >
            
            <img
                :alt="img"                          
                :src="'https://home-optic.ipol.tech' + img"
            />
        </b-carousel-slide>               
    </b-carousel>
  </b-modal>
    
</template>
<script>
export default {
    props: ['item']
}
</script>
<style >
    .modal-body {
        padding: 0;
    }
</style>
