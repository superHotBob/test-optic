<template>
  <masonry :cols="{default: 6, 1300: 5, 1000: 4, 700: 2, 400: 1}" :gutter="15">
    <div 
      class="catalog-item" 
      v-for="arItem in arResult.ITEMS" :key="arItem.ID" 
    >
      <item v-bind:item="arItem"></item>
    </div>
  </masonry>
</template>

<script>

import Item from '~/components/catalog/item/Item.vue'

export default {
    name: 'SectionElements',
    components: {
      Item
    },
    props: {
      arResult: Object,
    },
}
</script>
  

