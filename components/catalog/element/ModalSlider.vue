<template>
    <b-modal id="modal-center" size="xl" centered >
        <b-carousel
            id="carousel-8"           
            :interval="40000"
            :controls="item.CURRENT.MORE_PHOTO.length>1"
            :indicators="item.CURRENT.MORE_PHOTO.length>1"
            background="#fff"          
        >
            <b-carousel-slide  :key="index" v-for="(img, index) in item.CURRENT.MORE_PHOTO" >            
                <img
                    v-bind:style="{cursor: 'pointer'}"
                    alt="new img"                          
                    :src="'https://home-optic.ru' + img"
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
    img {
        height: 100%;       
    }
    .modal-body {
        padding: 0 !important;
    }
    .modal-header .close {
        margin: -40px 10px 0;
        padding: 0;
        color: #fff;
        opacity: 1;
    }
    .modal-header .close:active {
        outline: none;
    }
    .carousel-caption {
        padding: 0;
    }
    .modal-header {
        padding: 0 !important;
    }
    .carousel {
        height: auto !important;
    }
    @media (max-width: 680px) {
        .modal-dialog {
            margin: 0;
        }
        .carousel {
            height: fit-content !important;
        }
        .carousel-inner {
            top: 0;
        }
    }
</style>
