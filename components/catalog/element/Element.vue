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
              <li :data-value="value.ID" v-on:click="selectOfferProp(prop.ID, value.ID, $event)" v-for="value in prop.VALUES" :key="value.ID">
                {{value.NAME}}
              </li>
            </ul>
          </div>
        </div>
        <p v-for="price in item.CURRENT.ITEM_PRICES" :key="price.ID">
          {{price.PRINT_RATIO_PRICE}}
        </p>
        <button class="btn btn-primary" v-on:click.stop.prevent="basket(item.CURRENT.ADD_URL)">Купить</button>
      </div>
    
    </div>
</template>

<script>

import offers from '~/mixins/offers.js'

export default {
    mixins: [offers],
    props: {
        item: Object,
    },
    methods: {
      async basket(url) {
        let response = await this.$axios.get(`${url}&ajax_basket=Y`);
        this.$store.dispatch('basket/state');
      },
    },
    computed: {
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