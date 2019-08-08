<template>
<b-modal class="item-added" id="item-added" static lazy hide-header hide-footer no-stacking>
    <div class="modal-wrap" v-if="item">
        <button class="modal-close" @click="$bvModal.hide('item-added')">
            <span class="modal-close__icon"></span>
        </button>
        <p class="item-added__response" v-if="response.STATUS == 'OK'">Товар добавлен в корзину</p>
        <p class="item-added__response" v-else>{{response.error}}</p>
        <img alt="" v-for="(img, index) in item.MORE_PHOTO" :key="index" :src="img">
        <p class="item-added__name">{{item.NAME}}</p>
        <nuxt-link class="item-added__cart-link button" @click.native="$bvModal.hide('item-added')" to="/basket">Перейти в корзину</nuxt-link>
    </div>
</b-modal>
</template>

<script>
export default {
    data() {
        return {
            item: null,
            response: null,
        }
    },
    mounted() {
        this.$root.$on('add-item', result => {
            this.item = result.item;
            this.response = result.response;
        });
    }
}
</script>

<style lang="scss">
.item-added {
    text-align: center;
    .modal-dialog {
        max-width: 410px;
    }
    &__response {
        margin-top: 18px;
        margin-bottom: 28px;
        font-size: 18px;
        line-height: 24px;
        font-weight: 700;
    }
    img {
        display: block;
        width: 186px;
        object-fit: contain;
        margin: 0 auto;
        margin-bottom: 19px;
    }
    &__name {
        margin-bottom: 7px;
        font-size: 15px;
        line-height: 21px;
        font-weight: 500;
    }
    &__price {
        margin-bottom: 18px;
        font-size: 15px;
        line-height: 15px;
        font-weight: 600;
        i {
            margin-left: 3px;
            font-size: 13px;
            line-height: 13px;
        }
    }
    &__cart-link {
        height: 44px;
        padding: 0 34px;
        margin-bottom: 10px;
        font-size: 12px;
        line-height: 44px;
        text-decoration: none!important;
        display: block;
    }
}

@media (max-width: 768px) {
    .item-added {
        .modal-dialog {
            max-width: 300px;
        }
        &__response {
            margin-top: 29px;
            margin-bottom: 18px;
            font-size: 16px;
            line-height: 22px;
        }
        img {
            width: 148px;
            height: 192px;
            margin-bottom: 15px;
        }
        &__name {
            margin-bottom: 4px;
            font-size: 12px;
            line-height: 18px;
        }
        &__price {
            margin-bottom: 11px;
            font-size: 13px;
            line-height: 13px;
            i {
                font-size: 11px;
                line-height: 11px;
            }
        }
        &__cart-link {
            padding: 0 31px;
            height: 38px;
            font-size: 10px;
            line-height: 38px;
        }
    }
}
</style>
