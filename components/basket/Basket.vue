<template>
  <div>
      {{getBasket.BASKET_ITEMS_COUNT}}
      <div class="basket-item" v-for="arItem in getBasket.GRID.ROWS" :key="arItem.ID">
            <img v-if="arItem.PREVIEW_PICTURE_SRC" :src="'http://home-optic.proj' + arItem.PREVIEW_PICTURE_SRC"/>
            <div>
                <span>{{arItem.NAME}}</span>
                <div>
                    <div class="sku-props" v-for="prop in arItem.SKU_BLOCK_LIST" :key="prop.ID">
                        <div>{{prop.NAME}}</div>
                        <ul>
                            <li v-on:click="changeOffer(arItem.ID, prop.CODE, value.VALUE_ID)" v-for="value in prop.SKU_VALUES_LIST" :key="value.ID" 
                                v-bind:class="{ 'selected': value.SELECTED, 'not-available':value.NOT_AVAILABLE_OFFER }">
                                {{value.NAME}}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <span>Цена: {{arItem.PRICE_FORMATED}}</span>
            <quantity v-bind:id="arItem.ID"/>
            <span>Сумма: {{arItem.SUM_FULL_PRICE_FORMATED}}</span>
            <button v-on:click="deleteItem(arItem.ID)" type="button" class="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
      </div>
      <div>
          Итого: {{getBasket.allSum_FORMATED}}
      </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';
import Quantity from '~/components/basket/Quantity.vue'

export default {
    name: 'Basket',
    components: {
        Quantity
    },
    methods: {
        changeOffer(id, code, value) {
            this.$store.dispatch('basket/change',{'id':id, 'code':code, 'value':value,});
        },
        deleteItem(id) {
            this.$store.dispatch('basket/delete',{'id':id});
        }
    },
    mounted() {
        this.$root.$on('login/logout', result => { 
            this.$store.dispatch('basket/request');
        })
        this.$root.$on('order', result => { 
            this.$store.dispatch('basket/request');
        })
    },
    watch: {
        'getBasket': function() {
            this.$store.dispatch('order/state'); 
        }
    },
    computed: {
        ...mapGetters({
            getBasket: 'basket/getBasket'
        }),
    },

}
</script>
  
<style scoped>
    .basket-item {
        min-height: 50px;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .sku-props .selected {
        color: #007bff;
    }
</style>

