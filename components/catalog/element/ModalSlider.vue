<template>
    <b-modal id="modal-center" size="xl" centered >
        <template v-if="item.CURRENT.MORE_PHOTO.length>1">
        <b-carousel
            id="carousel-8"           
            :interval="40000"
            :controls="item.CURRENT.MORE_PHOTO.length>1"
            :indicators="item.CURRENT.MORE_PHOTO.length>1"
            background="#fff"          
        >
            <b-carousel-slide  :key="index" v-for="(img, index) in item.CURRENT.MORE_PHOTO" >           
                <img class="img_modal"    
                   
                    alt="new img"                          
                    :src="'https://home-optic.ru' + img"
                />
            </b-carousel-slide>               
        </b-carousel>
        </template>
        <template v-else>
             <div class="item_img" v-bind:style="{backgroundImage:
                'url(https://home-optic.ru' + item.CURRENT.MORE_PHOTO[0] + ')'}" 
                             
            >   </div>       
             <!-- <img                    
                v-bind:style="{cursor: 'pointer',height:'70vh'}"
                alt="new img"                          
                :src="'https://home-optic.ru' + item.CURRENT.MORE_PHOTO[0]"
            /> -->
        </template>       
    </b-modal>    
</template>
<script>
export default {
    props: ['item']
}
</script>
<style>
    .item_img {
        height: 90vh;
        text-align: center;
        background-position: center;
        background-size: 100% auto;
        background-repeat: no-repeat;
    }
    .img_modal {
        height: 90vh;
        width: 80vw;          
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
        .img_modal {
            height: auto;
            width: 100%;       
        }
        .modal-content {
            width: 100%;
        }
         .img_modal {
            height: auto;
            width: 100vw;
          
        }
        .modal-body {
            width: 100%
        }
        .item_img {
            height: 50vh;
            text-align: center;
            background-position: center;
            background-size: 100% auto;
            background-repeat: no-repeat;
        }
    }
</style>
<style scoped>
    .modal-content {
        width: 80vw;
        margin: 0 auto;
    }
    .modal-body {
        padding: 0 !important;
    }
</style>

