<template>
  <masonry :cols="{default: 6, 1300: 5, 1000: 4, 700: 2, 400: 1}" :gutter="15">
    <div 
      class="catalog-item" 
      v-for="(item, index) in items" :key="index" 
    >
      <item v-bind:item="item"></item>
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
      items: Array,
    },
}
</script>
  

