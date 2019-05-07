<template>
    <div>
      <img v-for="img in item.CURRENT.MORE_PHOTO" :key="img.ID" :src="'http://home-optic.proj' + img.SRC"/>
      <div class="item-name">
        <p>
          <nuxt-link :to="{ name: 'element', params: {element: item.CODE }}">
            {{item.CURRENT.NAME}}
          </nuxt-link>
        </p>
        <div v-if="item.JS_OFFERS">
          <div v-for="prop in item.SKU_PROPS" :key="prop.ID" ref="sku_line_block">
            <div>{{prop.NAME}}</div>
            <ul class="sku-props">
              <li :data-value="value.ID" @click="selectOfferProp(prop.ID, value.ID, $event)" v-for="value in prop.VALUES" :key="value.ID">
                {{value.NAME}}
              </li>
            </ul>
          </div>
        </div>
        <p v-for="price in item.CURRENT.ITEM_PRICES" :key="price.ID">
          {{price.PRINT_RATIO_PRICE}}
        </p>
        <button class="btn btn-primary" :class="{'active':isFavorites(item.ID)}" @click="clickFavorites">Избранное</button>
        <button class="btn btn-primary" @click="basket(item.CURRENT.ADD_URL)">Купить</button>
      </div>
    
    </div>
</template>

<script>

import offers from '~/mixins/offers.js'
import { mapGetters } from 'vuex'

export default {
    mixins: [offers],
    props: {
        item: Object,
    },
    data() {
      return {
        timer:null,
        id: this.item.ID
      }
    },
    methods: {
      async basket(url) {
        let response = await this.$axios.get(`${url}&ajax_basket=Y`);
        this.$store.dispatch('basket/STATE');
      },
      clickFavorites() {
        if (!!this.timer)
        {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            this.loadFavorites();
        }, 500)
      },
      loadFavorites() {
         var cookie, elementsId = [];
        
        if (cookie = this.$cookie.get('favorites'))
          elementsId = JSON.parse(cookie);

        if (this.in_array(this.id,elementsId))
          elementsId.remove(this.id);
        else 
          elementsId.push(this.id);

        this.$cookie.set('favorites', JSON.stringify(elementsId), { expires: '1Y' });
        this.$store.dispatch('catalog/GET_FAVORITES');
      }
    },
    computed: {
      ...mapGetters({
        isFavorites: 'catalog/isFavorites',
      })
    },
}
</script>

<style>
  .sku-props .selected {
    color: #007bff;
  }
  img {
    max-width: 100%;
  }
</style>